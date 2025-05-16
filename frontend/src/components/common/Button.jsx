// src/components/common/Button.jsx
import React from "react";
import PropTypes from "prop-types";

// Adaptation avec les variables CSS définies dans :root de index.css
const VARIANT = {
  primary: [
    "bg-[var(--color-primary-dark)]",
    "text-white",
    "hover:bg-[var(--color-lis-blue)]",
    "focus:ring-[var(--color-lis-blue)]",
  ],
  secondary: [
    "bg-[var(--color-background)]",
    "text-[var(--color-primary-dark)]",
    "hover:bg-[var(--color-accent-light)]",
    "focus:ring-[var(--color-accent-light)]",
  ],
};

export default function Button({
  variant = "primary",
  className = "",
  children,
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

  const classes = [...base, ...(VARIANT[variant] || VARIANT.primary), className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
