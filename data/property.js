import { photos } from "./photos";

export const property = {
  id: "aspen-solitude-sanctuary",
  title: "The Glass Pavilion at Red Mountain · Alpine Luxury Villa",
  subtitle: "Entire villa in Aspen, Colorado, United States",
  badge: "Guest favorite",
  badgeSubtitle: "One of the most loved homes on Airbnb, according to guests",
  rating: 4.98,
  reviewCount: 128,
  location: "Aspen, Colorado, United States",
  type: "Entire villa",
  guests: 8,
  bedrooms: 4,
  beds: 5,
  baths: 4.5,
  pricePerNight: 745,
  cleaningFee: 280,
  serviceFee: 412,
  occupancyTaxes: 345,
  host: {
    name: "Sarah & David",
    role: "Superhost",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    isSuperhost: true,
    coHosts: ["David Miller", "Elena Rostova (Property Concierge)"],
    joinedDate: "October 2017",
    responseRate: "100%",
    responseTime: "within an hour",
    reviewsCount: 462,
    rating: 4.99,
    yearsHosting: 7,
    bio: "Passionate architectural designers and lifelong alpine enthusiasts. We built The Glass Pavilion to embrace Aspen's dramatic light, mountain horizons, and timeless tranquility. We pride ourselves on offering bespoke 5-star concierge hospitality for unforgettable alpine getaways.",
  },
  highlights: [
    {
      id: "guest-favorite",
      title: "Guest favorite",
      description: "One of the top 1% of homes on Airbnb based on ratings, reviews, and reliability.",
      icon: "Trophy",
    },
    {
      id: "workspace",
      title: "Dedicated workspace",
      description: "A private mezzanine office with Herman Miller ergonomic seating and 500 Mbps fiber Wi-Fi.",
      icon: "Laptop",
    },
    {
      id: "self-checkin",
      title: "Self check-in",
      description: "Check yourself in with the secure smart keypad entry system.",
      icon: "KeyRound",
    },
    {
      id: "free-cancellation",
      title: "Free cancellation for 48 hours",
      description: "Full refund if cancelled at least 14 days before your scheduled check-in.",
      icon: "CalendarCheck",
    },
  ],
  description: `Escape to The Glass Pavilion, an architectural triumph set high on the prestigious slopes of Red Mountain in Aspen. Designed by award-winning modernist architects, this 5,200 sq. ft. sanctuary harmoniously blends floor-to-ceiling glass, charred cedar timber, and hand-cut Colorado stone.

Awaken to unobstructed, panoramic vistas of Aspen Mountain and Independence Pass. The open-plan great room features 18-foot vaulted ceilings, a roaring double-sided gas fireplace, and seamless flow into a gourmet chef's kitchen outfitted with Wolf and Sub-Zero appliances.

Step through automated sliding glass walls onto the expansive wraparound cedar deck. Unwind in the sunken heated infinity plunge pool, revitalize in the custom outdoor cedar barrel sauna, or gather around the fire pit beneath star-filled alpine skies.

Located just 6 minutes from downtown Aspen's world-class dining, boutiques, and ski gondolas, yet enveloped in pristine private alpine forest solitude.`,
  bedroomsList: [
    {
      room: "Bedroom 1 (Primary Suite)",
      bed: "1 King bed",
      icon: "BedDouble",
      details: "Ensuite spa bath, private balcony, walk-in closet",
    },
    {
      room: "Bedroom 2 (Alpine Suite)",
      bed: "1 Queen bed",
      icon: "Bed",
      details: "Ensuite bath, garden view, blackout blinds",
    },
    {
      room: "Bedroom 3 (Mountain Guest)",
      bed: "1 Queen bed",
      icon: "Bed",
      details: "Ensuite bath, forest view, custom oak desk",
    },
    {
      room: "Bedroom 4 (Lodge Bunk / Twin)",
      bed: "2 Single beds",
      icon: "BedSingle",
      details: "Reading lamps, USB-C ports, adjacent bathroom",
    },
  ],
  amenityCategories: [
    {
      category: "Scenic Views",
      items: [
        { name: "Mountain view", icon: "Mountain", available: true },
        { name: "Valley view", icon: "Compass", available: true },
      ],
    },
    {
      category: "Bathroom & Spa",
      items: [
        { name: "Private hot tub / infinity plunge pool", icon: "Waves", available: true },
        { name: "Outdoor cedar barrel sauna", icon: "Flame", available: true },
        { name: "Freestanding soaking tub", icon: "Bath", available: true },
        { name: "Rain showers", icon: "Droplets", available: true },
        { name: "Luxury organic bath amenities & robes", icon: "Sparkles", available: true },
      ],
    },
    {
      category: "Bedroom & Laundry",
      items: [
        { name: "Washer & Dryer in unit", icon: "Shirt", available: true },
        { name: "Egyptian cotton linens", icon: "Feather", available: true },
        { name: "Room-darkening shades", icon: "Moon", available: true },
        { name: "Hangers & iron", icon: "Check", available: true },
      ],
    },
    {
      category: "Entertainment & Family",
      items: [
        { name: "75\" 4K OLED Smart TV with Sonos Sound", icon: "Tv", available: true },
        { name: "Board games & vinyl record player", icon: "Disc", available: true },
        { name: "Books and reading library", icon: "BookOpen", available: true },
      ],
    },
    {
      category: "Heating & Cooling",
      items: [
        { name: "Indoor gas fireplace", icon: "Flame", available: true },
        { name: "Radiant in-floor heating", icon: "SunMedium", available: true },
        { name: "Central air conditioning", icon: "Wind", available: true },
      ],
    },
    {
      category: "Home Safety",
      items: [
        { name: "Exterior security cameras", icon: "ShieldCheck", available: true },
        { name: "Smoke alarm & Carbon monoxide alarm", icon: "Bell", available: true },
        { name: "First aid kit & Fire extinguisher", icon: "Cross", available: true },
      ],
    },
    {
      category: "Internet & Office",
      items: [
        { name: "Fast Wi-Fi – 500 Mbps", icon: "Wifi", available: true },
        { name: "Dedicated office workspace", icon: "Laptop", available: true },
      ],
    },
    {
      category: "Kitchen & Dining",
      items: [
        { name: "Fully equipped chef's kitchen", icon: "Utensils", available: true },
        { name: "Wolf 6-burner gas range & oven", icon: "CookingPot", available: true },
        { name: "Sub-Zero refrigerator & freezer", icon: "Refrigerator", available: true },
        { name: "Nespresso & Chemex pour-over coffee", icon: "Coffee", available: true },
        { name: "Wine cellar & temperature-controlled cooler", icon: "Wine", available: true },
        { name: "Dishwasher", icon: "Sparkles", available: true },
      ],
    },
    {
      category: "Outdoor & Parking",
      items: [
        { name: "Free heated garage parking on premises (2 cars)", icon: "Car", available: true },
        { name: "EV charger (Level 2 Tesla & J1772)", icon: "Zap", available: true },
        { name: "Outdoor dining area & gas BBQ grill", icon: "Flame", available: true },
        { name: "Outdoor fire pit with lounge chairs", icon: "Sun", available: true },
        { name: "Ski-in / ski-out gear locker with boot dryers", icon: "Snowflake", available: true },
      ],
    },
  ],
  ratingsBreakdown: {
    cleanliness: 5.0,
    accuracy: 4.9,
    checkIn: 5.0,
    communication: 5.0,
    location: 4.9,
    value: 4.8,
  },
  reviews: [
    {
      id: 1,
      author: "Michael Chang",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
      location: "San Francisco, California",
      date: "February 2026",
      rating: 5,
      content: "An absolute masterclass in luxury alpine living. The Glass Pavilion exceeded all our expectations. Waking up to the sunrise over Aspen Mountain while sipping espresso by the fireplace is an experience we will cherish forever. Sarah was exceptionally responsive and helped arrange private ski shuttles.",
    },
    {
      id: 2,
      author: "Jessica Laurent",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80",
      location: "London, United Kingdom",
      date: "January 2026",
      rating: 5,
      content: "The design details are immaculate. The heated pool and cedar sauna after a long day on the slopes are unmatched. The kitchen is fully equipped for private chef dinners. Spotless cleanliness, ultra-comfortable beds, and complete silence. We are already planning our return next winter!",
    },
    {
      id: 3,
      author: "Marcus & Olivia Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80",
      location: "New York, New York",
      date: "December 2025",
      rating: 5,
      content: "Top-tier Airbnb experience. The photos honestly don't do justice to the scale of the views and the quality of construction. Super fast fiber internet allowed us to work smoothly between ski sessions. Highly recommend to anyone seeking Aspen luxury.",
    },
    {
      id: 4,
      author: "Camilla Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80",
      location: "Miami, Florida",
      date: "November 2025",
      rating: 5,
      content: "Incredible weekend getaway with close friends. The heated floors, boot warmers, and Sonos sound system throughout the home created the coziest atmosphere. Sarah and David are true Superhosts.",
    },
  ],
  photos: photos,
};
