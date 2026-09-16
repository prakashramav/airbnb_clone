import React from "react";
import { MapPin, Navigation, Car, Plane } from "lucide-react";

export function LocationSection({ property }) {
  return (
    <section id="location" className="py-10" aria-labelledby="location-heading">
      <h2 id="location-heading" className="text-[22px] font-semibold text-airbnb-charcoal mb-2">
        Where you&apos;ll be
      </h2>
      <p className="text-base text-airbnb-muted mb-6">
        {property.location}
      </p>

      {/* Styled Map Graphic / Container */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-airbnb-border bg-slate-100 shadow-inner flex items-center justify-center">
        {/* Stylized topography / map background */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Decorative roads / contour lines */}
        <svg
          className="absolute inset-0 w-full h-full stroke-slate-300 stroke-[2] fill-none opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-100 100 Q 200 80, 500 240 T 1200 300" />
          <path d="M100 -50 Q 300 200, 600 250 T 1100 500" />
          <path d="M400 -20 Q 550 150, 750 350" />
        </svg>

        {/* Pulsing Pin Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full bg-[#FF385C]/20 animate-ping" />
            <div className="w-12 h-12 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-6 h-6 fill-current" />
            </div>
          </div>
          <div className="mt-3 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full shadow-md border border-airbnb-border text-xs font-semibold text-airbnb-charcoal">
            Exact location provided after booking
          </div>
        </div>

        {/* Map Corner Badge */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-airbnb-border text-xs font-medium text-airbnb-charcoal shadow-sm">
          Red Mountain Slopes · Aspen, CO
        </div>
      </div>

      {/* Neighborhood Proximities */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-airbnb-charcoal">
        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-airbnb-charcoal flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Downtown Aspen</div>
            <div className="text-airbnb-muted">6 min drive · 2.4 miles</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Car className="w-5 h-5 text-airbnb-charcoal flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Aspen Mountain Gondola</div>
            <div className="text-airbnb-muted">8 min drive · 3.1 miles</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Plane className="w-5 h-5 text-airbnb-charcoal flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Aspen Pitkin Airport (ASE)</div>
            <div className="text-airbnb-muted">14 min drive · 6.5 miles</div>
          </div>
        </div>
      </div>
    </section>
  );
}
