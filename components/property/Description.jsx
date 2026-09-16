"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export function Description({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-6 border-b border-airbnb-borderLight" aria-labelledby="about-this-space-title">
      <h2 id="about-this-space-title" className="text-[22px] font-semibold text-airbnb-charcoal mb-4">
        About this space
      </h2>

      <div
        className={`text-base text-airbnb-charcoal leading-relaxed whitespace-pre-line ${
          !isExpanded ? "line-clamp-4" : ""
        }`}
      >
        {description}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 inline-flex items-center gap-1 font-semibold text-base text-airbnb-charcoal underline hover:text-black transition focus-visible:ring-2 focus-visible:ring-black rounded"
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? "Show less" : "Show more"}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
      </button>
    </section>
  );
}
