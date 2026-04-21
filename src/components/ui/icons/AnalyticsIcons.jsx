import React from 'react';


export function ChartIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M5 19V9m7 10V5m7 14v-7M3 19h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
