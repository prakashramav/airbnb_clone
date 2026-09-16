"use client";

import React from "react";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#F7F7F7] border-t border-airbnb-borderLight mt-16 text-sm text-airbnb-charcoal">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
        {/* Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-airbnb-borderLight">
          <div>
            <h3 className="font-semibold text-airbnb-charcoal mb-4">Support</h3>
            <ul className="space-y-3 text-airbnb-muted">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-airbnb-charcoal mb-4">Hosting</h3>
            <ul className="space-y-3 text-airbnb-muted">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-airbnb-charcoal mb-4">Airbnb</h3>
            <ul className="space-y-3 text-airbnb-muted">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Gift cards</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-airbnb-muted">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>© 2026 Airbnb Clone, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-airbnb-charcoal">
            <button type="button" className="flex items-center gap-2 hover:underline">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </button>
            <button type="button" className="hover:underline">
              <span>$ USD</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
