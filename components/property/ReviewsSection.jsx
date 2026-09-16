import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export function ReviewsSection({ property }) {
  const breakdownKeys = [
    { label: "Cleanliness", score: property.ratingsBreakdown.cleanliness },
    { label: "Accuracy", score: property.ratingsBreakdown.accuracy },
    { label: "Check-in", score: property.ratingsBreakdown.checkIn },
    { label: "Communication", score: property.ratingsBreakdown.communication },
    { label: "Location", score: property.ratingsBreakdown.location },
    { label: "Value", score: property.ratingsBreakdown.value },
  ];

  return (
    <section id="reviews" className="py-10 border-b border-airbnb-borderLight" aria-labelledby="reviews-heading">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-5 h-5 fill-current text-airbnb-charcoal" />
        <h2 id="reviews-heading" className="text-[22px] font-semibold text-airbnb-charcoal">
          {property.rating} · {property.reviewCount} reviews
        </h2>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 mb-10">
        {breakdownKeys.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm text-airbnb-charcoal">
            <span className="font-normal">{item.label}</span>
            <div className="flex items-center gap-3 w-1/2">
              <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-airbnb-charcoal h-full rounded-full"
                  style={{ width: `${(item.score / 5.0) * 100}%` }}
                />
              </div>
              <span className="font-semibold text-xs text-airbnb-charcoal w-6 text-right">
                {item.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {property.reviews.map((review) => (
          <div key={review.id} className="space-y-3">
            {/* Reviewer info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-airbnb-border">
                <Image
                  src={review.avatar}
                  alt={review.author}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-airbnb-charcoal leading-tight">
                  {review.author}
                </h3>
                <p className="text-sm text-airbnb-muted">{review.location}</p>
              </div>
            </div>

            {/* Rating & Date */}
            <div className="flex items-center gap-2 text-xs text-airbnb-charcoal">
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current text-airbnb-charcoal" />
                ))}
              </div>
              <span>·</span>
              <span className="font-semibold text-airbnb-muted">{review.date}</span>
            </div>

            {/* Testimonial */}
            <p className="text-base text-airbnb-charcoal leading-relaxed">
              {review.content}
            </p>
          </div>
        ))}
      </div>

      {/* Show all reviews button */}
      <div className="mt-8">
        <button
          type="button"
          className="border border-airbnb-charcoal font-semibold text-sm text-airbnb-charcoal px-6 py-3 rounded-lg hover:bg-airbnb-bgLight transition focus-visible:ring-2 focus-visible:ring-black"
        >
          Show all {property.reviewCount} reviews
        </button>
      </div>
    </section>
  );
}
