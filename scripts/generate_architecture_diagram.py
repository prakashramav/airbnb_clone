import os
from PIL import Image, ImageDraw, ImageFont

def draw_rounded_rect(draw, bbox, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

def create_diagram():
    width = 1920
    height = 1280
    
    # High-res canvas with dark slate modern theme
    img = Image.new('RGB', (width, height), color='#0A0E17')
    draw = ImageDraw.Draw(img)
    
    # Fonts
    font_path_bold = 'C:/Windows/Fonts/segoeuib.ttf'
    font_path_regular = 'C:/Windows/Fonts/segoeui.ttf'
    font_path_semibold = 'C:/Windows/Fonts/segoeuisb.ttf'
    
    if not os.path.exists(font_path_bold):
        font_path_bold = 'C:/Windows/Fonts/arialbd.ttf'
    if not os.path.exists(font_path_regular):
        font_path_regular = 'C:/Windows/Fonts/arial.ttf'
    if not os.path.exists(font_path_semibold):
        font_path_semibold = font_path_bold

    title_font = ImageFont.truetype(font_path_bold, 36)
    subtitle_font = ImageFont.truetype(font_path_regular, 18)
    badge_font = ImageFont.truetype(font_path_semibold, 14)
    header_font = ImageFont.truetype(font_path_semibold, 18)
    card_title_font = ImageFont.truetype(font_path_bold, 17)
    card_body_font = ImageFont.truetype(font_path_regular, 14)
    arrow_font = ImageFont.truetype(font_path_regular, 12)

    # 1. Background Grid & Subtle Accents
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill='#101624', width=1)
    for y in range(0, height, 40):
        draw.line([(y, 0), (width, y)], fill='#101624', width=1)
        
    # Top Banner Header
    draw_rounded_rect(draw, (40, 25, width - 40, 115), radius=16, fill='#111827', outline='#1F2937', width=2)
    
    # Title & Subtitle
    draw.text((70, 42), "AIRBNB SYSTEM ARCHITECTURE", font=title_font, fill='#FFFFFF')
    draw.text((640, 48), "HIGH-AVAILABILITY VACATION RENTAL MARKETPLACE", font=card_title_font, fill='#FF385C')
    draw.text((70, 84), "Global Scale: 50M+ MAUs  |  Sub-100ms P95 Latency  |  Event-Driven Microservices  |  Multi-Tier Caching", font=subtitle_font, fill='#9CA3AF')

    # Draw Badges
    badges = [("RSC & ISR", "#FF385C"), ("Envoy gRPC", "#38BDF8"), ("Kafka Streaming", "#A855F7"), ("Citus PostgreSQL", "#10B981")]
    bx = width - 580
    for text, color in badges:
        draw_rounded_rect(draw, (bx, 50, bx + 125, 82), radius=16, fill='#1F2937', outline=color, width=1)
        draw.text((bx + 14, 58), text, font=badge_font, fill=color)
        bx += 135

    # ==========================
    # LAYER 1: CLIENTS
    # ==========================
    c_box = (460, 140, width - 460, 205)
    draw_rounded_rect(draw, c_box, radius=12, fill='#161F33', outline='#38BDF8', width=2)
    draw.text((c_box[0] + 320, 150), "GLOBAL CLIENTS & USERS", font=card_title_font, fill='#38BDF8')
    draw.text((c_box[0] + 160, 175), "Desktop Web (Next.js 14)  |  Mobile Web (PWA)  |  iOS Native (Swift)  |  Android Native (Kotlin)", font=card_body_font, fill='#D1D5DB')

    # Arrow to CDN
    draw.line([(width // 2, 205), (width // 2, 245)], fill='#38BDF8', width=2)
    draw.polygon([(width // 2 - 6, 245), (width // 2 + 6, 245), (width // 2, 255)], fill='#38BDF8')
    draw.text((width // 2 + 15, 220), "HTTPS / TLS 1.3 / HTTP/3", font=arrow_font, fill='#60A5FA')

    # ==========================
    # LAYER 2: EDGE CDN
    # ==========================
    cdn_box = (360, 255, width - 360, 335)
    draw_rounded_rect(draw, cdn_box, radius=12, fill='#161F33', outline='#F59E0B', width=2)
    draw.text((cdn_box[0] + 420, 265), "GLOBAL EDGE CDN (CLOUDFLARE)", font=card_title_font, fill='#F59E0B')
    draw.text((cdn_box[0] + 180, 295), "Edge SSR / HTML Cache (s-maxage=300)  |  Anycast DNS  |  WebP / AVIF Optimization  |  DDoS / WAF Shield", font=card_body_font, fill='#E5E7EB')

    # Arrow to Frontend Fleet
    draw.line([(width // 2, 335), (width // 2, 375)], fill='#F59E0B', width=2)
    draw.polygon([(width // 2 - 6, 375), (width // 2 + 6, 375), (width // 2, 385)], fill='#F59E0B')

    # ==========================
    # LAYER 3: FRONTEND FLEET
    # ==========================
    fe_box = (300, 385, width - 300, 470)
    draw_rounded_rect(draw, fe_box, radius=12, fill='#161F33', outline='#FF385C', width=2)
    draw.text((fe_box[0] + 460, 395), "NEXT.JS 14 FRONTEND FLEET", font=card_title_font, fill='#FF385C')
    draw.text((fe_box[0] + 160, 422), "Node.js Container Fleet (EKS)  |  React Server Components (RSC) Streaming  |  On-Demand ISR Revalidation", font=card_body_font, fill='#F3F4F6')
    draw.text((fe_box[0] + 280, 444), "Client Leaf Hydration (BookingCard, Lightbox, PhotoTour) with Tailwind CSS", font=card_body_font, fill='#9CA3AF')

    # Arrow to Gateway
    draw.line([(width // 2, 470), (width // 2, 510)], fill='#FF385C', width=2)
    draw.polygon([(width // 2 - 6, 510), (width // 2 + 6, 510), (width // 2, 520)], fill='#FF385C')
    draw.text((width // 2 + 15, 485), "Internal gRPC / HTTPS", font=arrow_font, fill='#F472B6')

    # ==========================
    # LAYER 4: API GATEWAY
    # ==========================
    gw_box = (250, 520, width - 250, 595)
    draw_rounded_rect(draw, gw_box, radius=12, fill='#161F33', outline='#A855F7', width=2)
    draw.text((gw_box[0] + 480, 530), "GLOBAL API GATEWAY / ENVOY PROXY", font=card_title_font, fill='#C084FC')
    draw.text((gw_box[0] + 200, 558), "OAuth 2.0 & JWT Authentication  |  Rate Limiting / Token Bucket  |  Service Discovery & Circuit Breaking", font=card_body_font, fill='#E5E7EB')

    # Arrow bus to Microservices
    draw.line([(width // 2, 595), (width // 2, 630)], fill='#A855F7', width=2)
    draw.line([(140, 630), (width - 140, 630)], fill='#A855F7', width=2)

    # ==========================
    # LAYER 5: MICROSERVICES (8 Services in 2 Rows)
    # ==========================
    services_row1 = [
        ("User Service", ["User & Host Profiles", "Identity Verification", "Superhost Badges"], "#38BDF8"),
        ("Listing Service", ["Listing Metadata / CRUD", "45+ Categorized Amenities", "Hero Photo Registry"], "#38BDF8"),
        ("Search Engine", ["OpenSearch / Elastic", "Polygon Geo-Search", "Filter & Facet Engine"], "#38BDF8"),
        ("Booking Engine", ["Distributed Redlock Lock", "State Machine (Hold/Book)", "Instant Cancellation"], "#FF385C"),
    ]
    services_row2 = [
        ("Payment Service", ["Stripe / Escrow / Vault", "Multi-Currency Math", "Automated Host Payouts"], "#10B981"),
        ("Review Service", ["4.98 Rating Breakdown", "6 Sub-category Bars", "Verified Guest Feedback"], "#38BDF8"),
        ("Notification Hub", ["WebSocket Live Alerts", "Push Notifications", "Twilio SMS & Email"], "#F59E0B"),
        ("ML Analytics", ["Dynamic Pricing Engine", "Search Ranking Model", "Clickstream Tracking"], "#C084FC"),
    ]

    card_w = 380
    gap_x = 40
    start_x = 80
    
    # Row 1
    y1 = 650
    for i, (title, items, color) in enumerate(services_row1):
        cx = start_x + i * (card_w + gap_x)
        # Connector from bus
        draw.line([(cx + card_w // 2, 630), (cx + card_w // 2, y1)], fill='#A855F7', width=2)
        draw.polygon([(cx + card_w // 2 - 5, y1 - 5), (cx + card_w // 2 + 5, y1 - 5), (cx + card_w // 2, y1)], fill='#A855F7')
        
        draw_rounded_rect(draw, (cx, y1, cx + card_w, y1 + 120), radius=10, fill='#131B2E', outline=color, width=1)
        draw.text((cx + 16, y1 + 12), title, font=card_title_font, fill=color)
        for idx, item in enumerate(items):
            draw.text((cx + 20, y1 + 42 + idx * 24), f"•  {item}", font=card_body_font, fill='#94A3B8')

    # Row 2
    y2 = 790
    for i, (title, items, color) in enumerate(services_row2):
        cx = start_x + i * (card_w + gap_x)
        # Inter-row bus
        draw.line([(cx + card_w // 2, y1 + 120), (cx + card_w // 2, y2)], fill='#475569', width=1)
        draw.polygon([(cx + card_w // 2 - 4, y2 - 4), (cx + card_w // 2 + 4, y2 - 4), (cx + card_w // 2, y2)], fill='#475569')

        draw_rounded_rect(draw, (cx, y2, cx + card_w, y2 + 120), radius=10, fill='#131B2E', outline=color, width=1)
        draw.text((cx + 16, y2 + 12), title, font=card_title_font, fill=color)
        for idx, item in enumerate(items):
            draw.text((cx + 20, y2 + 42 + idx * 24), f"•  {item}", font=card_body_font, fill='#94A3B8')

    # Connector bus to Data Layer
    draw.line([(140, 930), (width - 140, 930)], fill='#64748B', width=2)
    for i in range(4):
        cx = start_x + i * (card_w + gap_x) + card_w // 2
        draw.line([(cx, y2 + 120), (cx, 930)], fill='#64748B', width=1)

    # ==========================
    # LAYER 6: SHARED INFRASTRUCTURE & DATA
    # ==========================
    infra_row = [
        ("Sharded PostgreSQL", ["Citus Horizontal Sharding", "Primary-Replica HA", "ACID Compliant Transactions"], "#10B981"),
        ("Redis Cluster", ["Redlock Distributed Locking", "Hot Listing LRU Cache", "Session State (Sub-ms)"], "#EF4444"),
        ("Apache Kafka", ["Event-Driven Invalidation", "Booking Status Fan-Out", "CDC via Debezium"], "#A855F7"),
        ("AWS S3 & Cloud Storage", ["High-Res Listing Photos", "Multi-resolution WebP Variants", "Cross-Region Replication"], "#F59E0B"),
    ]

    y_infra = 960
    for i, (title, items, color) in enumerate(infra_row):
        cx = start_x + i * (card_w + gap_x)
        draw.line([(cx + card_w // 2, 930), (cx + card_w // 2, y_infra)], fill='#64748B', width=2)
        draw.polygon([(cx + card_w // 2 - 5, y_infra - 5), (cx + card_w // 2 + 5, y_infra - 5), (cx + card_w // 2, y_infra)], fill='#64748B')
        
        draw_rounded_rect(draw, (cx, y_infra, cx + card_w, y_infra + 125), radius=10, fill='#0F172A', outline=color, width=2)
        draw.text((cx + 16, y_infra + 12), title, font=card_title_font, fill=color)
        for idx, item in enumerate(items):
            draw.text((cx + 20, y_infra + 42 + idx * 24), f"•  {item}", font=card_body_font, fill='#CBD5E1')

    # Bottom Footer Status Bar
    draw_rounded_rect(draw, (40, 1115, width - 40, 1175), radius=10, fill='#111827', outline='#1F2937', width=1)
    draw.text((70, 1135), "ENTERPRISE SPEC: Multi-Region Active-Active DR  |  Prometheus & Jaeger Observability  |  Zero-Downtime Blue/Green Deployments", font=subtitle_font, fill='#9CA3AF')
    draw.text((width - 320, 1135), "WCAG 2.1 AA COMPLIANT FRONTEND", font=badge_font, fill='#10B981')

    # Save PNG
    os.makedirs('docs', exist_ok=True)
    img.save('architecture-diagram.png', 'PNG')
    img.save('docs/architecture-diagram.png', 'PNG')
    
    # Save PDF
    img_rgb = img.convert('RGB')
    img_rgb.save('architecture-diagram.pdf', 'PDF', resolution=150.0)
    img_rgb.save('docs/architecture-diagram.pdf', 'PDF', resolution=150.0)
    
    print("Architecture diagram images and PDFs generated successfully.")

if __name__ == '__main__':
    create_diagram()
