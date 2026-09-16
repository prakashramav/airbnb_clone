"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { LightboxControls } from "./LightboxControls";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export function Lightbox({
  isOpen,
  currentIndex,
  photos = [],
  onClose,
  onNext,
  onPrev,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Lock body scroll when Lightbox is active
  useBodyScrollLock(isOpen);

  // Keyboard navigation & focus trapping
  useKeyboardNavigation({
    enabled: isOpen,
    onEscape: onClose,
    onArrowLeft: onPrev,
    onArrowRight: onNext,
    containerRef: modalRef,
  });

  // Focus management: save focus on open, move focus inside, restore on close
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      // Focus close button inside modal
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 50);
    } else {
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen || !photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery lightbox"
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center select-none"
    >
      {/* Accessible Backdrop dismiss */}
      <div
        className="absolute inset-0 z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Lightbox Controls */}
      <LightboxControls
        currentIndex={currentIndex}
        totalPhotos={photos.length}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
        closeButtonRef={closeButtonRef}
      />

      {/* Main Image Stage */}
      <div className="relative z-20 w-full max-w-6xl h-[75vh] flex items-center justify-center px-4 sm:px-12">
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
          <Image
            key={currentPhoto.id}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Bottom Photo Metadata & Caption */}
      <div className="relative z-20 text-center max-w-2xl px-6 py-4">
        <p className="text-white text-base font-medium">
          {currentPhoto.category}
        </p>
        {currentPhoto.caption && (
          <p className="text-white/70 text-sm mt-1">
            {currentPhoto.caption}
          </p>
        )}
      </div>
    </div>
  );
}
