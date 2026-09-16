"use client";

import React from "react";

export function IconButton({
  children,
  ariaLabel,
  onClick,
  className = "",
  variant = "ghost",
  size = "md",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black";

  const sizeStyles = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-3",
  };

  const variantStyles = {
    ghost: "text-airbnb-charcoal hover:bg-airbnb-bgLight active:scale-95",
    bordered:
      "border border-airbnb-border bg-white text-airbnb-charcoal hover:border-airbnb-charcoal hover:shadow-sm active:scale-95",
    dark: "bg-black/60 text-white border border-white/20 hover:bg-black/80 hover:scale-105 active:scale-95",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.ghost
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
