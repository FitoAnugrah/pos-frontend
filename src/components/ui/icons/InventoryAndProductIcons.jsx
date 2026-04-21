import React from 'react';


export function BoxIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Zm8 4.5V16.5L12 21l-8-4.5v-9m8 4.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PhotoIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H9l1.2 1.5H17.5A2.5 2.5 0 0 1 20 9v7.5A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Zm8 2.5a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CameraIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export function GalleryIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 6.5A2 2 0 0 1 6.5 4.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11ZM8 14l2.3-2.3a1.2 1.2 0 0 1 1.7 0l1.2 1.2a1.2 1.2 0 0 0 1.7 0L16 12m-6-3.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
