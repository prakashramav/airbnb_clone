"use client";

import { useEffect } from "react";

/**
 * Custom hook to lock body scrolling when a modal or overlay is active.
 * Handles scrollbar compensation to prevent horizontal page layout shifts.
 * 
 * @param {boolean} isLocked Whether scrolling should be locked
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLocked) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = "";
      };
    }
  }, [isLocked]);
}
