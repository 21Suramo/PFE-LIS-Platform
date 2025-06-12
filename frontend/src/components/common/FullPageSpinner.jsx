import React from "react";

export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base dark:bg-base-dark z-50">
      <svg
        className="h-12 w-12 animate-spin text-[var(--color-primary)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
    </div>
  );
}
