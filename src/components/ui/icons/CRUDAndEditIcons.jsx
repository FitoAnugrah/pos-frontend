import React from 'react';


export function EditIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="m4 20 4.5-1 8.95-8.94a1.77 1.77 0 0 0 0-2.5l-1-1a1.77 1.77 0 0 0-2.5 0L5 15.5 4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PencilIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )
}

export function TrashIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 7h16m-3 0-.7 11.2A2 2 0 0 1 14.3 20H9.7a2 2 0 0 1-1.99-1.8L7 7m3-3h4m-5 3V4.7A.7.7 0 0 1 9.7 4h4.6a.7.7 0 0 1 .7.7V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function RefreshIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M20 7v5h-5M4 17v-5h5m11-1a7 7 0 0 0-12-3M4 13a7 7 0 0 0 12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
