"use client";

import React, { useState } from "react";
import { Star, ChevronDown, Plus, Minus, Flag } from "lucide-react";
import { formatCurrency } from "@/utils/gallery";

export function BookingCard({ property }) {
  const [nights, setNights] = useState(5);
  const [checkIn, setCheckIn] = useState("2026-10-12");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  const totalGuests = adults + childrenCount;
  const basePrice = property.pricePerNight * nights;
  const cleaningFee = property.cleaningFee;
  const serviceFee = property.serviceFee;
  const taxes = property.occupancyTaxes;
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes;

  const handleDateChange = (e, type) => {
    if (type === "checkin") {
      setCheckIn(e.target.value);
    } else {
      setCheckOut(e.target.value);
    }
  };

  return (
    <div className="sticky top-28 z-20 w-full max-w-[380px] xl:max-w-[400px] ml-auto">
      <div className="bg-white border border-airbnb-border rounded-2xl p-6 shadow-airbnb-card">
        {/* Header: Price & Rating */}
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold text-airbnb-charcoal">
              {formatCurrency(property.pricePerNight)}
            </span>
            <span className="text-airbnb-muted text-base">night</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-current text-airbnb-charcoal" />
            <span className="font-semibold text-airbnb-charcoal">{property.rating}</span>
            <span className="text-airbnb-muted">·</span>
            <span className="text-airbnb-muted underline">{property.reviewCount} reviews</span>
          </div>
        </div>

        {/* Inputs Box */}
        <div className="border border-airbnb-border rounded-xl overflow-hidden mb-4">
          {/* Top: Dates */}
          <div className="grid grid-cols-2 border-b border-airbnb-border divide-x divide-airbnb-border">
            <label className="p-3 cursor-pointer hover:bg-airbnb-bgLight transition">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-airbnb-charcoal">
                Check-in
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => handleDateChange(e, "checkin")}
                className="w-full text-xs font-medium text-airbnb-charcoal bg-transparent focus:outline-none cursor-pointer"
              />
            </label>

            <label className="p-3 cursor-pointer hover:bg-airbnb-bgLight transition">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-airbnb-charcoal">
                Checkout
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => handleDateChange(e, "checkout")}
                className="w-full text-xs font-medium text-airbnb-charcoal bg-transparent focus:outline-none cursor-pointer"
              />
            </label>
          </div>

          {/* Bottom: Guests */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              className="w-full p-3 text-left flex items-center justify-between hover:bg-airbnb-bgLight transition"
              aria-expanded={isGuestDropdownOpen}
              aria-label={`Guests: ${totalGuests} guest${totalGuests > 1 ? "s" : ""}`}
            >
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-airbnb-charcoal">
                  Guests
                </span>
                <span className="text-xs font-medium text-airbnb-charcoal">
                  {totalGuests} guest{totalGuests > 1 ? "s" : ""}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-airbnb-charcoal transition-transform ${
                  isGuestDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Guests Popover */}
            {isGuestDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-airbnb-border rounded-xl p-4 shadow-airbnb-modal z-30 space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-airbnb-charcoal">Adults</div>
                    <div className="text-xs text-airbnb-muted">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(adults - 1)}
                      className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 transition"
                      aria-label="Decrease adults"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center text-sm font-semibold">{adults}</span>
                    <button
                      type="button"
                      disabled={totalGuests >= property.guests}
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 transition"
                      aria-label="Increase adults"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-airbnb-charcoal">Children</div>
                    <div className="text-xs text-airbnb-muted">Ages 2–12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={childrenCount <= 0}
                      onClick={() => setChildrenCount(childrenCount - 1)}
                      className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 transition"
                      aria-label="Decrease children"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center text-sm font-semibold">{childrenCount}</span>
                    <button
                      type="button"
                      disabled={totalGuests >= property.guests}
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-black disabled:opacity-30 transition"
                      aria-label="Increase children"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-airbnb-borderLight text-right">
                  <button
                    type="button"
                    onClick={() => setIsGuestDropdownOpen(false)}
                    className="text-xs font-semibold underline text-airbnb-charcoal hover:text-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reserve CTA */}
        <button
          type="button"
          className="w-full py-3.5 rounded-xl text-white font-semibold text-base bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 active:scale-[0.99] transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-black"
        >
          Reserve
        </button>

        <p className="text-center text-xs text-airbnb-muted mt-3">
          You won&apos;t be charged yet
        </p>

        {/* Price Breakdown */}
        <div className="mt-6 space-y-3 text-sm text-airbnb-charcoal">
          <div className="flex justify-between">
            <span className="underline">
              {formatCurrency(property.pricePerNight)} × {nights} nights
            </span>
            <span>{formatCurrency(basePrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>{formatCurrency(cleaningFee)}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline">Occupancy taxes and fees</span>
            <span>{formatCurrency(taxes)}</span>
          </div>

          <div className="pt-4 border-t border-airbnb-borderLight flex justify-between font-bold text-base text-airbnb-charcoal">
            <span>Total before taxes</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Report Listing */}
      <div className="mt-6 text-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-xs text-airbnb-muted hover:text-airbnb-charcoal underline"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>
    </div>
  );
}
