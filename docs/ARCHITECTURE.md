# Production Architecture: Distributed Vacation Rental Marketplace

## 1. System Overview
This document specifies the target enterprise architecture for a global, high-availability, high-concurrency vacation-rental marketplace designed to handle 50M+ monthly active users, 10M+ active property listings, and 100K+ bookings per day with sub-100ms P95 latency.

---

## 2. High-Level Architecture Diagram

```
                              [ GLOBAL USERS & CLIENTS ]
                    (Desktop Web / Mobile Web / Native iOS & Android)
                                        │
                                        ▼ HTTPS (HTTP/3, TLS 1.3, Anycast DNS)
                         ┌─────────────────────────────┐
                         │   Global Edge CDN (Cloudflare)│
                         │  - Edge SSR / HTML Caching  │
                         │  - Static Asset Delivery    │
                         │  - Image Optimization / WebP │
                         │  - WAF & DDoS Mitigation     │
                         └──────────────┬──────────────┘
                                        │
                                        ▼
                         ┌─────────────────────────────┐
                         │  Next.js Frontend Fleet     │
                         │  - Node.js / Vercel Edge    │
                         │  - React Server Components  │
                         │  - Incremental Static Regen │
                         └──────────────┬──────────────┘
                                        │
                                        ▼ Internal HTTPS / gRPC
                         ┌─────────────────────────────┐
                         │   Global API Gateway / Envoy │
                         │  - OAuth 2.0 / JWT Auth     │
                         │  - Rate Limiting / Throttling│
                         │  - Dynamic Traffic Routing  │
                         └──────────────┬──────────────┘
                                        │
          ┌─────────────────────────────┴─────────────────────────────┐
          │                                                           │
          ▼                                                           ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   User Service   │  │ Listing Service  │  │  Search Service  │  │ Booking Service  │
│ - Profiles       │  │ - CRUD Listings  │  │ - Geo-spatial    │  │ - Concurrency lock│
│ - Identity / KYC │  │ - Room/Amenities │  │ - Price filters  │  │ - State machine  │
│ - Host profiles  │  │ - Media registry │  │ - Elastic/OpenSrch│ │ - Cancellation   │
└─────────┬────────┘  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
          │                    │                     │                     │
          └────────────────────┼─────────────────────┼─────────────────────┘
                               │                     │
          ┌────────────────────┴─────────────────────┴────────────────────┐
          │                                                               │
          ▼                                                               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Payment Service  │  │  Review Service  │  │Notification Svc  │  │ Analytics Engine │
│ - Stripe / Escrow│  │ - Star ratings   │  │ - WebSockets     │  │ - Clickstream    │
│ - Multi-currency │  │ - Verified guests│  │ - Push / Email   │  │ - ML Ranking     │
│ - Host payouts   │  │ - Sub-scores     │  │ - SMS (Twilio)   │  │ - Pricing model  │
└─────────┬────────┘  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
          │                    │                     │                     │
          └────────────────────┼─────────────────────┼─────────────────────┘
                               │
                               ▼
 ═════════════════════════════════════════════════════════════════════════════════════
                              SHARED INFRASTRUCTURE LAYER
 ═════════════════════════════════════════════════════════════════════════════════════
          │                    │                     │                     │
          ▼                    ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │   Redis Cluster  │  │  Apache Kafka    │  │ AWS S3 / Cloud   │
│ - Sharded (Citus)│  │ - Distributed Lock│ │ - Event Streaming │ │ - Original Photos │
│ - Master-Replica │  │ - Hot Cache (LRU)│  │ - Booking Events │  │ - WebP variants  │
│ - ACID compliance│  │ - Session State  │  │ - Async Fan-out  │  │ - Multi-region   │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 3. Deep-Dive Architectural Pillars

### 3.1 Scalability & Compute Strategy
- **Containerization & Orchestration:**
  - Microservices packaged as lightweight Docker containers managed by Amazon EKS (Kubernetes).
  - Horizontal Pod Autoscaling (HPA) triggers on CPU (>70%), memory, and incoming request queuing thresholds.
- **Next.js Rendering Strategy:**
  - **Static Site Generation (SSG) & Incremental Static Regeneration (ISR):** Popular listing pages are pre-rendered at build time or revalidated every 60 seconds.
  - **React Server Components (RSC):** Non-interactive layout sections (description, reviews list, host details, amenities) render on the server, streaming lightweight HTML with zero JavaScript bundle overhead.
  - **Dynamic Client Components:** Only interactive leaf widgets (reservation calculator, date picker, photo tour modal, lightbox) hydrate on the client.

### 3.2 Caching Strategy & Low-Latency Retrieval
- **Edge CDN Caching:** Cloudflare edges cache public HTML responses with `stale-while-revalidate=60, s-maxage=300`.
- **Redis In-Memory Cache (Multi-Tier):**
  - **L1 In-Process Cache:** Node.js/Go memory cache for static reference data (amenity definitions, localized strings).
  - **L2 Distributed Redis Cluster:** Listing metadata, calendar availability bitmaps, and user session tokens with sub-millisecond access.
  - **Cache Invalidation:** Event-driven invalidation via Kafka. When a host updates pricing or photos, a `ListingUpdatedEvent` purges the corresponding Redis keys and triggers Next.js on-demand ISR revalidation via tags (`revalidateTag('listing-${id}')`).

### 3.3 Database Scaling & Storage Architecture
- **Relational Data (PostgreSQL + Citus / AWS Aurora):**
  - Listings, user profiles, reservations, and transactions require strict ACID guarantees.
  - Sharded horizontally by `listing_id` or `geo_region_id`.
  - Read/Write splitting: 1 Primary Writer with 5 Read Replicas per region, routing search and view reads to replicas.
- **High-Throughput Search & Geo-spatial (Elasticsearch / OpenSearch):**
  - Denormalized search documents indexed with latitude/longitude polygons, date availability ranges, price tiers, and amenity vectors.
  - Sub-second spatial queries for bounding-box map exploration.
- **Object Storage (AWS S3 + CloudFront / Cloudflare Images):**
  - Master raw images uploaded directly via presigned S3 URLs.
  - Serverless pipeline (AWS Lambda / Cloudflare Workers) resizes images into responsive WebP/AVIF breakpoints (thumbnail 400w, card 800w, hero 1600w, full 2400w).

### 3.4 Concurrency & Distributed Booking Transactions
- **Double-Booking Prevention:**
  - Two users attempting to book the same property for overlapping dates are guarded by **Redis Distributed Locks (Redlock)** and PostgreSQL row-level locks (`SELECT ... FOR UPDATE`).
  - Strict calendar availability state machine: `AVAILABLE` -> `HOLD_PENDING_PAYMENT` (15-min TTL) -> `CONFIRMED` or `EXPIRED`.
- **Asynchronous Processing via Kafka:**
  - Payment authorizations, booking confirmation emails, SMS notifications, and host calendar sync are published to Kafka topics (`booking.created`, `payment.authorized`).
  - Worker consumer groups process events asynchronously without blocking the user checkout thread.

### 3.5 High Availability, Disaster Recovery & Multi-Region Resilience
- **Active-Active Multi-Region Deployment:**
  - Deployed across US-East, US-West, and EU-Central with latency-based Anycast DNS routing.
  - Aurora Global Database provides cross-region storage replication with <1 second replica lag.
- **Fault Tolerance & Circuit Breaking:**
  - Envoy Service Mesh implements circuit breaking and automatic retries with exponential backoff.
  - Graceful degradation: If the Recommendation or Review service is temporarily degraded, the listing page continues to render core photos, details, and booking capabilities.

### 3.6 Observability, Monitoring & Security
- **Metrics & Dashboards:** Prometheus & Grafana capturing RPS, error rates (5xx), P50/P95/P99 latency, and saturation.
- **Distributed Tracing:** OpenTelemetry & Jaeger tracing user requests from Next.js frontend across gateway and internal microservices.
- **Centralized Logging:** Elastic Stack (ELK) / Datadog with structured JSON logging and correlation IDs (`X-Correlation-ID`).
- **Security & Compliance:**
  - PCI-DSS compliant payment processing tokenized via Stripe/Adyen.
  - Strict Content Security Policy (CSP), CORS, rate-limiting (Cloudflare Rate Limiting), and zero-trust mutual TLS (mTLS) between internal microservices.

### 3.7 CI/CD & Deployment Pipeline
- Automated GitHub Actions pipeline:
  1. Static analysis, ESLint, TypeScript type-check, Prettier.
  2. Unit and integration tests (Jest / React Testing Library).
  3. End-to-end regression tests (Playwright).
  4. Docker container build & vulnerability scan (Trivy / Snyk).
  5. Blue/Green or Canary zero-downtime deployment to Kubernetes cluster with automated rollback on anomaly detection.
