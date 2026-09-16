"use client";

import React from "react";
import Image from "next/image";
import {
  Trophy,
  Laptop,
  KeyRound,
  CalendarCheck,
  Medal,
} from "lucide-react";

export function PropertyDetails({ property }) {
  const iconMap = {
    Trophy: Trophy,
    Laptop: Laptop,
    KeyRound: KeyRound,
    CalendarCheck: CalendarCheck,
  };

  return (
    <div className="space-y-6">
      {/* Room and Capacity summary */}
      <div className="flex items-center justify-between pb-6 border-b border-airbnb-borderLight">
        <div>
          <h2 className="text-[22px] font-semibold text-airbnb-charcoal leading-snug">
            {property.type} hosted by {property.host.name}
          </h2>
          <ol className="flex flex-wrap items-center gap-x-2 text-base text-airbnb-charcoal mt-1">
            <li>{property.guests} guests</li>
            <li aria-hidden="true">·</li>
            <li>{property.bedrooms} bedrooms</li>
            <li aria-hidden="true">·</li>
            <li>{property.beds} beds</li>
            <li aria-hidden="true">·</li>
            <li>{property.baths} baths</li>
          </ol>
        </div>

        {/* Host Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-airbnb-border relative">
            <Image
              src={property.host.avatar}
              alt={property.host.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          {property.host.isSuperhost && (
            <div
              className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow-sm"
              title="Superhost"
              aria-label="Superhost"
            >
              <Medal className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-6 py-2 pb-6 border-b border-airbnb-borderLight">
        {property.highlights.map((item) => {
          const IconComponent = iconMap[item.icon] || Trophy;
          return (
            <div key={item.id} className="flex items-start gap-4">
              <div className="pt-0.5 text-airbnb-charcoal flex-shrink-0">
                <IconComponent className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-airbnb-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm text-airbnb-muted leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
