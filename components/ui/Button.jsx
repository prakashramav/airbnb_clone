"use client";

import React from "react";

export function Button({
  children,
  variant = "secondary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base rounded-xl",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white hover:opacity-95 active:scale-[0.99] shadow-sm",
    secondary:
      "border border-airbnb-charcoal text-airbnb-charcoal bg-white hover:bg-airbnb-bgLight active:scale-[0.98]",
    ghost:
      "text-airbnb-charcoal hover:bg-airbnb-bgLight active:bg-[#EBEBEB]",
    outline:
      "border border-airbnb-border text-airbnb-charcoal bg-white hover:border-airbnb-charcoal",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.secondary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
