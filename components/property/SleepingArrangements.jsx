import React from "react";
import { BedDouble, Bed, BedSingle } from "lucide-react";

export function SleepingArrangements({ bedrooms = [] }) {
  const iconMap = {
    BedDouble: BedDouble,
    Bed: Bed,
    BedSingle: BedSingle,
  };

  return (
    <section className="py-8 border-b border-airbnb-borderLight" aria-labelledby="sleeping-arrangements-title">
      <h2 id="sleeping-arrangements-title" className="text-[22px] font-semibold text-airbnb-charcoal mb-6">
        Where you&apos;ll sleep
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {bedrooms.map((room, idx) => {
          const IconComponent = iconMap[room.icon] || BedDouble;
          return (
            <div
              key={idx}
              className="border border-airbnb-border rounded-2xl p-6 bg-white flex flex-col justify-between"
            >
              <div>
                <IconComponent className="w-6 h-6 text-airbnb-charcoal mb-4 stroke-[1.5]" />
                <h3 className="font-semibold text-base text-airbnb-charcoal mb-1">
                  {room.room}
                </h3>
                <p className="text-sm text-airbnb-muted">
                  {room.bed}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-airbnb-borderLight text-xs text-airbnb-muted">
                {room.details}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
