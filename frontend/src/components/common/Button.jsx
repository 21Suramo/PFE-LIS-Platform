import React from "react";

const VARIANT = {
  primary: [
    "bg-[var(--color-primary)]",
    "text-white",
    "hover:bg-[var(--color-primary-dark)]",
    "focus:ring-[var(--color-focus)]",
  ],
  secondary: [
    "bg-[var(--color-background)]",
    "text-[var(--color-primary)]",
    "hover:bg-[var(--color-accent)]",
    "focus:ring-[var(--color-accent)]",
  ],
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const base = [
    "px-md",
    "py-md",
    "rounded-md",
    "text-sm sm:text-base",
    "transition duration-300 shadow-sm hover:shadow-md",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ];

  const classes = [...base, ...(VARIANT[variant] || VARIANT.primary), className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
