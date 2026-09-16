"use client";

import { useState, useCallback } from "react";
import { getWrappedIndex } from "@/utils/gallery";

/**
 * Custom hook for controlling Lightbox state.
 * 
 * @param {Array} photos Array of photo objects
 * @returns {Object} Lightbox controls and state
 */
export function useLightbox(photos = []) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index = 0) => {
    const validIndex = Math.max(0, Math.min(index, photos.length - 1));
    setCurrentIndex(validIndex);
    setIsOpen(true);
  }, [photos.length]);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => getWrappedIndex(prev, photos.length, 1));
  }, [photos.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => getWrappedIndex(prev, photos.length, -1));
  }, [photos.length]);

  return {
    isOpen,
    currentIndex,
    currentPhoto: photos[currentIndex] || null,
    totalPhotos: photos.length,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
    setCurrentIndex,
  };
}
