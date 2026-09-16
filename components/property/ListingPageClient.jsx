"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { PropertyDetails } from "@/components/property/PropertyDetails";
import { Description } from "@/components/property/Description";
import { SleepingArrangements } from "@/components/property/SleepingArrangements";
import { Amenities } from "@/components/property/Amenities";
import { BookingCard } from "@/components/property/BookingCard";
import { ReviewsSection } from "@/components/property/ReviewsSection";
import { HostSection } from "@/components/property/HostSection";
import { LocationSection } from "@/components/property/LocationSection";
import { PhotoTour } from "@/components/gallery/PhotoTour";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";

export function ListingPageClient({ property }) {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const {
    isOpen: isLightboxOpen,
    currentIndex: lightboxIndex,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  } = useLightbox(property.photos);

  const handleOpenPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const handleClosePhotoTour = () => {
    setIsPhotoTourOpen(false);
  };

  const handleSelectFromTour = (index) => {
    openLightbox(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-20 pb-16">
        {/* Title & Share/Save */}
        <PropertyHeader property={property} />

        {/* 5-Photo Hero Grid */}
        <PhotoGrid
          photos={property.photos}
          onOpenTour={handleOpenPhotoTour}
          onOpenLightbox={openLightbox}
        />

        {/* Two-Column Details & Sticky Reservation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8">
          {/* Left Column: Property information */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-2">
            <PropertyDetails property={property} />
            <Description description={property.description} />
            <SleepingArrangements bedrooms={property.bedroomsList} />
            <Amenities categories={property.amenityCategories} />
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-5 xl:col-span-4 relative">
            <BookingCard property={property} />
          </div>
        </div>

        {/* Full-width Reviews */}
        <ReviewsSection property={property} />

        {/* Full-width Host Profile */}
        <HostSection property={property} />

        {/* Full-width Location & Map */}
        <LocationSection property={property} />
      </main>

      <Footer />

      {/* Photo Tour Modal Overlay */}
      {isPhotoTourOpen && (
        <PhotoTour
          photos={property.photos}
          isOpen={isPhotoTourOpen}
          onClose={handleClosePhotoTour}
          onSelectPhoto={handleSelectFromTour}
        />
      )}

      {/* Lightbox Modal Overlay */}
      <Lightbox
        isOpen={isLightboxOpen}
        currentIndex={lightboxIndex}
        photos={property.photos}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
