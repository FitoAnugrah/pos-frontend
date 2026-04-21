import React from 'react';


export function SearchIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M11 5a6 6 0 1 0 0 12a6 6 0 0 0 0-12Zm8 14l-3.25-3.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ScanIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M7 4.5H5.75A1.25 1.25 0 0 0 4.5 5.75V7M17 4.5h1.25a1.25 1.25 0 0 1 1.25 1.25V7M7 19.5H5.75A1.25 1.25 0 0 1 4.5 18.25V17M17 19.5h1.25a1.25 1.25 0 0 0 1.25-1.25V17M9 9.5v5M12 8.5v7M15 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function QrCodeIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}
