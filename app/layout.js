import "./globals.css";

export const metadata = {
  title: "The Glass Pavilion at Red Mountain · Alpine Luxury Villa - Airbnb Clone",
  description: "Experience luxury living in Aspen, Colorado. 4 bedrooms, 4.5 baths, heated infinity pool, panoramic mountain views.",
  keywords: ["Airbnb", "Luxury Villa", "Aspen", "Vacation Rental", "Architectural Home"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-airbnb-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
