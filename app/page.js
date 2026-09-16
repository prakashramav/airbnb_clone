import { property } from "@/data/property";
import { ListingPageClient } from "@/components/property/ListingPageClient";

export const metadata = {
  title: `${property.title} - Airbnb`,
  description: `${property.type} in ${property.location}. ${property.guests} guests, ${property.bedrooms} bedrooms, ${property.beds} beds, ${property.baths} baths.`,
};

export default function ListingPage() {
  return <ListingPageClient property={property} />;
}
