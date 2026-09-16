"use client";

import { useEffect } from "react";

/**
 * Custom hook for keyboard navigation and accessibility events.
 * Handles Escape, Left/Right arrow keys, and Tab focus cycling.
 * 
 * @param {Object} options
 * @param {boolean} options.enabled
 * @param {Function} [options.onEscape]
 * @param {Function} [options.onArrowLeft]
 * @param {Function} [options.onArrowRight]
 * @param {import('react').RefObject} [options.containerRef]
 */
export function useKeyboardNavigation({
  enabled = true,
  onEscape,
  onArrowLeft,
  onArrowRight,
  containerRef,
}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;

        case "ArrowLeft":
          if (onArrowLeft) {
            event.preventDefault();
            onArrowLeft();
          }
          break;

        case "ArrowRight":
          if (onArrowRight) {
            event.preventDefault();
            onArrowRight();
          }
          break;

        case "Tab":
          if (containerRef && containerRef.current) {
            const focusableElements = containerRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const focusable = Array.from(focusableElements).filter(
              (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
            );

            if (focusable.length === 0) return;

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            if (event.shiftKey) {
              if (
                document.activeElement === firstElement ||
                !containerRef.current.contains(document.activeElement)
              ) {
                event.preventDefault();
                lastElement.focus();
              }
            } else {
              if (
                document.activeElement === lastElement ||
                !containerRef.current.contains(document.activeElement)
              ) {
                event.preventDefault();
                firstElement.focus();
              }
            }
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onEscape, onArrowLeft, onArrowRight, containerRef]);
}
