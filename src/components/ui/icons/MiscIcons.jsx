import React from 'react';


export function FlashIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M13 3 7.5 12h3l-.5 9L16.5 12h-3L18 3h-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ListIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M8 7h10M8 12h10M8 17h10M4.5 7h.01M4.5 12h.01M4.5 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StarIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function RibbonStarIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 15.22l-4.7 2.47 1.8-5.32L4.5 8.78l5.5-.47L12 3l2 5.31 5.5.47-4.6 3.59 1.8 5.32L12 15.22z" />
    </svg>
  )
}

export function CircleStarIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5l-3.09 1.63.59-3.45L7 12.22l3.46-.5L12 8.5l1.54 3.22 3.46.5-2.5 2.46.59 3.45L12 16.5z" />
    </svg>
  )
}

export function MedalIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2L9 8l3 3 3-3-3-6zm0 10c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zM6 8L3 13c1.23 2.13 3.5 3.5 6 3.5v-2c-1.54 0-2.92-.77-3.75-1.95L6 11.5V8zm12 0v3.5l.75 1.05C19.58 13.73 18.2 14.5 16.66 14.5v2c2.5 0 4.77-1.37 6-3.5L18 8z" />
    </svg>
  )
}

export function VaultLogoIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  )
}
