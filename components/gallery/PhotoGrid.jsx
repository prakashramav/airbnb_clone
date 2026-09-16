"use client";

import React from "react";
import { GalleryImage } from "./GalleryImage";
import { LayoutGrid } from "lucide-react";

export function PhotoGrid({ photos = [], onOpenTour, onOpenLightbox }) {
  if (!photos || photos.length === 0) return null;

  const displayPhotos = photos.slice(0, 5);

  return (
    <section className="relative my-4" aria-label="Photo Gallery">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[380px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden">
        {/* Main Hero Photo (Column 1 & 2 on desktop: 50% width) */}
        <div className="md:col-span-2 h-full relative">
          <GalleryImage
            photo={displayPhotos[0]}
            index={0}
            total={photos.length}
            priority={true}
            onClick={() => onOpenTour ? onOpenTour() : onOpenLightbox(0)}
            roundedCorner="rounded-l-2xl"
          />
        </div>

        {/* Supporting 4 Photos in 2x2 Grid (Column 3 & 4 on desktop) */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
          {/* Top-Left of the 2x2 (index 1) */}
          <div className="relative h-full">
            {displayPhotos[1] && (
              <GalleryImage
                photo={displayPhotos[1]}
                index={1}
                total={photos.length}
                onClick={onOpenLightbox}
              />
            )}
          </div>

          {/* Top-Right of the 2x2 (index 2) - Top right rounded corner */}
          <div className="relative h-full">
            {displayPhotos[2] && (
              <GalleryImage
                photo={displayPhotos[2]}
                index={2}
                total={photos.length}
                roundedCorner="rounded-tr-2xl"
                onClick={onOpenLightbox}
              />
            )}
          </div>

          {/* Bottom-Left of the 2x2 (index 3) */}
          <div className="relative h-full">
            {displayPhotos[3] && (
              <GalleryImage
                photo={displayPhotos[3]}
                index={3}
                total={photos.length}
                onClick={onOpenLightbox}
              />
            )}
          </div>

          {/* Bottom-Right of the 2x2 (index 4) - Bottom right rounded corner */}
          <div className="relative h-full">
            {displayPhotos[4] && (
              <GalleryImage
                photo={displayPhotos[4]}
                index={4}
                total={photos.length}
                roundedCorner="rounded-br-2xl"
                onClick={onOpenLightbox}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating "Show all photos" button */}
      <button
        type="button"
        onClick={onOpenTour}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/95 hover:bg-white text-airbnb-charcoal border border-airbnb-charcoal font-semibold text-sm px-4 py-1.5 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-xs focus-visible:ring-2 focus-visible:ring-black"
        aria-label={`Show all ${photos.length} photos`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Show all {photos.length} photos</span>
      </button>
    </section>
  );
}
