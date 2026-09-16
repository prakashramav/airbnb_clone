import React from "react";

export function ImageCounter({ current, total, className = "" }) {
  return (
    <div
      className={`text-white text-sm font-medium tracking-wide ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">Photo </span>
      {current} / {total}
    </div>
  );
}
