"use client";

import React, { useState } from "react";
import Image from "next/image";

export function GalleryImage({
  photo,
  index,
  total,
  onClick,
  className = "",
  roundedCorner = "",
  priority = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      aria-label={`View photo ${index + 1} of ${total}: ${photo.alt}`}
      className={`relative w-full h-full overflow-hidden group focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-inset ${roundedCorner} ${className}`}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200 z-10" />

      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        onLoad={() => setIsLoaded(true)}
        className={`object-cover w-full h-full transition-all duration-300 group-hover:scale-[1.03] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" aria-hidden="true" />
      )}
    </button>
  );
}
