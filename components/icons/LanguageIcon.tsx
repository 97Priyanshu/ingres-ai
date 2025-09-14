import React from 'react';

export const LanguageIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.287 7.5 15.5 7.5c1.213 0 2.32-.439 3.166-1.136m0 0V3m-3.166 1.136c1.12 0 2.233.038 3.334.114m-16.5 0a48.473 48.473 0 016-.372m0 0v1.95m0 0c1.12 0 2.233.038 3.334.114M3 21h18M3 15h18"
    />
  </svg>
);
