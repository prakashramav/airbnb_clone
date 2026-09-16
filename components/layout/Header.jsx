"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Globe, Menu, User } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-airbnb-borderLight transition-all">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-airbnb-rausch hover:opacity-90 transition focus-visible:ring-2 focus-visible:ring-airbnb-rausch rounded-md p-1"
          aria-label="Airbnb Home"
        >
          <svg
            className="w-8 h-8 fill-current text-[#FF385C]"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.717-3.626 8.806-8.5 8.806-3.23 0-6.16-1.802-7.5-4.595-1.34 2.793-4.27 4.595-7.5 4.595-4.874 0-8.5-4.089-8.5-8.806 0-.924.243-1.805.91-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.037 1.963 9.492 1 11.5 1h4.5zm0 2.25c-1.168 0-2.128.537-3.084 2.235l-.478.919c-1.92 3.766-6.05 12.417-7.009 14.653l-.133.325c-.562 1.343-.796 2.052-.796 2.812 0 3.473 2.66 6.556 6.25 6.556 2.673 0 5.093-1.637 6.079-4.116l.171-.466.5-.168c.45-.152.95-.152 1.4 0l.5.168.171.466c.986 2.479 3.406 4.116 6.079 4.116 3.59 0 6.25-3.083 6.25-6.556 0-.76-.234-1.469-.796-2.812l-.133-.325c-.959-2.236-5.089-10.887-7.009-14.653l-.478-.919C18.128 3.787 17.168 3.25 16 3.25zm0 13c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5zm0 2.25c-1.243 0-2.25 1.007-2.25 2.25s1.007 2.25 2.25 2.25 2.25-1.007 2.25-2.25-1.007-2.25-2.25-2.25z" />
          </svg>
          <span className="font-bold text-xl tracking-tight text-[#FF385C]">airbnb</span>
        </Link>

        {/* Center: Search pill */}
        <div className="hidden md:flex items-center border border-airbnb-border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <button type="button" className="text-sm font-semibold px-3 text-airbnb-charcoal">
            Anywhere
          </button>
          <span className="h-4 w-px bg-airbnb-border" aria-hidden="true" />
          <button type="button" className="text-sm font-semibold px-3 text-airbnb-charcoal">
            Any week
          </button>
          <span className="h-4 w-px bg-airbnb-border" aria-hidden="true" />
          <button type="button" className="text-sm text-airbnb-muted px-3">
            Add guests
          </button>
          <div
            className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center text-white ml-2 shadow-sm"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Right: User Menu & Hosting */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="text-sm font-semibold text-airbnb-charcoal hover:bg-airbnb-bgLight px-3.5 py-2 rounded-full transition hidden lg:inline-flex"
          >
            Airbnb your home
          </button>

          <button
            type="button"
            aria-label="Choose a language and currency"
            className="p-2.5 text-airbnb-charcoal hover:bg-airbnb-bgLight rounded-full transition"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              type="button"
              aria-label="Main navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 border border-airbnb-border rounded-full p-2 pl-3.5 hover:shadow-md transition"
            >
              <Menu className="w-4 h-4 text-airbnb-charcoal" />
              <div className="w-7 h-7 bg-airbnb-charcoal text-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-airbnb-modal border border-airbnb-borderLight py-2 z-50 text-sm"
                role="menu"
              >
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 font-semibold text-airbnb-charcoal hover:bg-airbnb-bgLight transition"
                  role="menuitem"
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-airbnb-charcoal hover:bg-airbnb-bgLight transition"
                  role="menuitem"
                >
                  Log in
                </button>
                <div className="h-px bg-airbnb-borderLight my-1" />
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-airbnb-charcoal hover:bg-airbnb-bgLight transition"
                  role="menuitem"
                >
                  Airbnb your home
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-airbnb-charcoal hover:bg-airbnb-bgLight transition"
                  role="menuitem"
                >
                  Help Centre
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
