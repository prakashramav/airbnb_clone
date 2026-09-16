"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, Share, Heart } from "lucide-react";
import { groupPhotosByCategory } from "@/utils/gallery";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export function PhotoTour({
  photos = [],
  isOpen = true,
  onClose,
  onSelectPhoto,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);

  const previousActiveElement = useRef(null);

  // Lock body scroll when photo tour is open as overlay
  useBodyScrollLock(isOpen);

  // Allow ESC key to close Photo Tour and trap focus within container
  useKeyboardNavigation({
    enabled: isOpen,
    onEscape: onClose,
    containerRef: containerRef,
  });

  // Focus management: save focus on open, restore on close
  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
    } else {
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const grouped = groupPhotosByCategory(photos);
  const categories = ["All", ...Object.keys(grouped)];

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Full Photo Tour"
      className="fixed inset-0 z-40 bg-white overflow-y-auto"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-airbnb-borderLight px-6 sm:px-10 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo tour and return to listing"
          className="inline-flex items-center gap-2 p-2 -ml-2 rounded-full hover:bg-airbnb-bgLight transition focus-visible:ring-2 focus-visible:ring-black"
        >
          <ArrowLeft className="w-5 h-5 text-airbnb-charcoal" />
          <span className="font-semibold text-sm text-airbnb-charcoal">Back to listing</span>
        </button>

        {/* Category Pill Filters */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-airbnb-charcoal text-white shadow-sm"
                  : "bg-airbnb-bgLight text-airbnb-charcoal hover:bg-[#EBEBEB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Share photo tour"
            onClick={async () => {
              if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="p-2.5 rounded-full hover:bg-airbnb-bgLight transition"
          >
            <Share className="w-4 h-4 text-airbnb-charcoal" />
          </button>
          <button
            type="button"
            aria-label="Save listing"
            className="p-2.5 rounded-full hover:bg-airbnb-bgLight transition"
          >
            <Heart className="w-4 h-4 text-airbnb-charcoal" />
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-airbnb-charcoal tracking-tight">
            Photo Tour
          </h1>
          <p className="text-airbnb-muted text-sm mt-1">
            Browse all {photos.length} photos of the residence and grounds. Click any photo to view in high resolution.
          </p>
        </div>

        {/* Grid display */}
        <div className="space-y-12">
          {activeCategory === "All" ? (
            Object.entries(grouped).map(([categoryName, categoryPhotos]) => (
              <section key={categoryName} aria-labelledby={`category-${categoryName}`}>
                <h2
                  id={`category-${categoryName}`}
                  className="text-xl font-bold text-airbnb-charcoal mb-4 flex items-center justify-between"
                >
                  <span>{categoryName}</span>
                  <span className="text-xs font-normal text-airbnb-muted">
                    {categoryPhotos.length} {categoryPhotos.length === 1 ? "photo" : "photos"}
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryPhotos.map((photo) => {
                    const globalIndex = photos.findIndex((p) => p.id === photo.id);
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => onSelectPhoto(globalIndex)}
                        aria-label={`Open photo ${globalIndex + 1}: ${photo.alt}`}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100 focus-visible:ring-4 focus-visible:ring-black transition"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                        {photo.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {photo.caption}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPhotos.map((photo) => {
                const globalIndex = photos.findIndex((p) => p.id === photo.id);
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => onSelectPhoto(globalIndex)}
                    aria-label={`Open photo ${globalIndex + 1}: ${photo.alt}`}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100 focus-visible:ring-4 focus-visible:ring-black transition"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.caption}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
