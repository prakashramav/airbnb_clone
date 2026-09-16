"use client";

import React, { useState } from "react";
import { Star, Share, Heart, Trophy, Check } from "lucide-react";

export function PropertyHeader({ property }) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="pt-6 pb-6">
      {/* Title */}
      <h1 className="text-2xl md:text-[26px] font-semibold text-airbnb-charcoal leading-tight tracking-tight">
        {property.title}
      </h1>

      {/* Metadata & Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-2 text-sm">
        {/* Left: Rating, Reviews, Superhost, Location */}
        <div className="flex flex-wrap items-center gap-2 text-airbnb-charcoal">
          {property.badge && (
            <div className="inline-flex items-center gap-1.5 font-semibold text-xs bg-airbnb-bgLight border border-airbnb-border px-2.5 py-1 rounded-full mr-1">
              <Trophy className="w-3.5 h-3.5 text-airbnb-charcoal" />
              <span>{property.badge}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1 font-semibold">
            <Star className="w-4 h-4 fill-current text-airbnb-charcoal" />
            <span>{property.rating}</span>
          </div>

          <span className="text-airbnb-muted">·</span>

          <a
            href="#reviews"
            className="font-semibold underline hover:text-black transition"
          >
            {property.reviewCount} reviews
          </a>

          <span className="text-airbnb-muted">·</span>

          <a
            href="#location"
            className="font-semibold underline hover:text-black transition"
          >
            {property.location}
          </a>
        </div>

        {/* Right: Share & Save */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="relative inline-flex items-center gap-2 font-semibold text-sm underline hover:bg-airbnb-bgLight px-3 py-2 rounded-lg transition"
            aria-label="Share this listing"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Link copied!</span>
              </>
            ) : (
              <>
                <Share className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleSave}
            className="inline-flex items-center gap-2 font-semibold text-sm underline hover:bg-airbnb-bgLight px-3 py-2 rounded-lg transition"
            aria-label={isSaved ? "Remove from saved wishlist" : "Save this listing"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? "fill-[#FF385C] text-[#FF385C]" : "text-airbnb-charcoal"
              }`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
