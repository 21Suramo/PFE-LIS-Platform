// src/components/common/Button.jsx
import React from "react";

const VARIANT_CLASSES = {
  primary: [
    "bg-primary-dark",
    "text-white",
    "hover:bg-lis-blue",
    "focus:ring-lis-blue",
  ],
  secondary: [
    "bg-background",
    "text-primary-dark",
    "hover:bg-accent-light",
    "focus:ring-accent-light",
  ],
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const base = [
    "px-4",
    "py-2",
    "sm:px-6",
    "sm:py-3",
    "rounded-md",
    "text-sm",
    "sm:text-base",
    "transition",
    "duration-300",
    "shadow-sm",
    "hover:shadow-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ];

  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

  const allClasses = [...base, ...variantClasses, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
}
