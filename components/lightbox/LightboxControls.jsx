"use client";

import React from "react";
import { X, ChevronLeft, ChevronRight, Share, Heart } from "lucide-react";
import { ImageCounter } from "./ImageCounter";

export function LightboxControls({
  currentIndex,
  totalPhotos,
  onClose,
  onPrev,
  onNext,
  closeButtonRef,
}) {
  return (
    <>
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer (Escape)"
          className="flex items-center gap-2 text-white/90 hover:text-white px-3 py-2 rounded-full hover:bg-white/10 transition focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:inline">Close</span>
        </button>

        {/* Counter */}
        <ImageCounter current={currentIndex + 1} total={totalPhotos} />

        {/* Top-Right Secondary Controls */}
        <div className="flex items-center gap-2 text-white/90">
          <button
            type="button"
            aria-label="Share this photo"
            className="p-2.5 rounded-full hover:bg-white/10 hover:text-white transition focus-visible:ring-2 focus-visible:ring-white"
            onClick={async () => {
              if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            <Share className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Save photo"
            className="p-2.5 rounded-full hover:bg-white/10 hover:text-white transition focus-visible:ring-2 focus-visible:ring-white"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side Navigation Buttons */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous photo (Arrow Left)"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo (Arrow Right)"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}
