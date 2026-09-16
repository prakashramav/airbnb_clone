"use client";

import React, { useState } from "react";
import {
  Mountain,
  Waves,
  Flame,
  Laptop,
  Wifi,
  Car,
  Utensils,
  ShieldCheck,
  Wind,
  Shirt,
  X,
  Check,
} from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export function Amenities({ categories = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = React.useRef(null);
  const previousActiveElement = React.useRef(null);

  // Lock body scroll when amenities modal is open
  useBodyScrollLock(isModalOpen);

  // Close on Escape and trap focus
  useKeyboardNavigation({
    enabled: isModalOpen,
    onEscape: () => setIsModalOpen(false),
    containerRef: modalRef,
  });

  // Focus management: save focus on open, restore on close
  React.useEffect(() => {
    if (isModalOpen) {
      previousActiveElement.current = document.activeElement;
    } else {
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    }
  }, [isModalOpen]);

  const iconLookup = {
    Mountain,
    Waves,
    Flame,
    Laptop,
    Wifi,
    Car,
    Utensils,
    ShieldCheck,
    Wind,
    Shirt,
  };

  // Extract top 10 preview items
  const previewItems = [
    { name: "Mountain view", icon: Mountain },
    { name: "Private hot tub / plunge pool", icon: Waves },
    { name: "Outdoor cedar sauna", icon: Flame },
    { name: "Dedicated workspace", icon: Laptop },
    { name: "Fast Wi-Fi – 500 Mbps", icon: Wifi },
    { name: "Free parking on premises", icon: Car },
    { name: "Indoor gas fireplace", icon: Flame },
    { name: "Fully equipped chef's kitchen", icon: Utensils },
    { name: "Exterior security cameras", icon: ShieldCheck },
    { name: "Central air conditioning", icon: Wind },
  ];

  const totalAmenities = categories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <section className="py-8 border-b border-airbnb-borderLight" aria-labelledby="amenities-title">
      <h2 id="amenities-title" className="text-[22px] font-semibold text-airbnb-charcoal mb-6">
        What this place offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-6">
        {previewItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 text-airbnb-charcoal py-1">
              <IconComp className="w-6 h-6 stroke-[1.5] text-airbnb-charcoal flex-shrink-0" />
              <span className="text-base">{item.name}</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="mt-2 border border-airbnb-charcoal font-semibold text-sm text-airbnb-charcoal px-6 py-3 rounded-lg hover:bg-airbnb-bgLight transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-black"
        aria-haspopup="dialog"
      >
        Show all {totalAmenities} amenities
      </button>

      {/* Amenities Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-amenities-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={modalRef}
            className="relative z-10 bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-airbnb-modal flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-airbnb-borderLight px-6 py-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close amenities dialog"
                className="p-2 -ml-2 rounded-full hover:bg-airbnb-bgLight transition focus-visible:ring-2 focus-visible:ring-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 id="all-amenities-modal-title" className="font-bold text-base text-airbnb-charcoal">
                Amenities
              </h3>
              <div className="w-8" aria-hidden="true" />
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-airbnb-borderLight">
              {categories.map((cat, idx) => (
                <div key={idx} className={idx > 0 ? "pt-8" : ""}>
                  <h4 className="font-semibold text-lg text-airbnb-charcoal mb-4">
                    {cat.category}
                  </h4>
                  <ul className="space-y-4">
                    {cat.items.map((item, itemIdx) => {
                      const ItemIcon = iconLookup[item.icon] || Check;
                      return (
                        <li
                          key={itemIdx}
                          className="flex items-center gap-4 text-base text-airbnb-charcoal"
                        >
                          <ItemIcon className="w-5 h-5 text-airbnb-charcoal stroke-[1.5]" />
                          <span>{item.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
