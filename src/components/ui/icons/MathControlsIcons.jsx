import React from 'react';


export function MinusIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
