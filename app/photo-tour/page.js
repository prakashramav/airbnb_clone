"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PhotoTour } from "@/components/gallery/PhotoTour";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { photos } from "@/data/photos";
import { getWrappedIndex } from "@/utils/gallery";

export default function PhotoTourPage() {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleSelectPhoto = (index) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => getWrappedIndex(prev, photos.length, 1));
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => getWrappedIndex(prev, photos.length, -1));
  };

  return (
    <>
      <PhotoTour
        photos={photos}
        isOpen={true}
        onClose={() => router.push("/")}
        onSelectPhoto={handleSelectPhoto}
      />

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={activePhotoIndex}
        photos={photos}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </>
  );
}
