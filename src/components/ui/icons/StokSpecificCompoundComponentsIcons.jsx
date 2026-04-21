import React from 'react';


export function StockHeaderIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e9f4ff] text-[#0d74c8] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M7 6.5h10M7 10.5h10M7 14.5h6M6 4h12a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 20H6a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 6 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function NavIcon({ id, active }) {
  const className = active ? 'text-[#0677CD]' : 'text-[#8fa2b8]'

  switch (id) {
    case 'terminal':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${className}`} aria-hidden="true">
          <path d="M4 7.5h16v9H4v-9Zm0-2A2.5 2.5 0 0 0 1.5 8v8A2.5 2.5 0 0 0 4 18.5h6v2h4v-2h6A2.5 2.5 0 0 0 22.5 16V8A2.5 2.5 0 0 0 20 5.5H4Z" fill="currentColor" />
        </svg>
      )
    case 'riwayat':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${className}`} aria-hidden="true">
          <path d="M12 4.5A7.5 7.5 0 1 1 4.96 9.9M4.5 5.5V9h3.5M12 8v4l2.7 1.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'stok':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${className}`} aria-hidden="true">
          <path d="M7 5.5h10M7 9.5h10M7 13.5h6M5.5 4.5h13v15h-13v-15Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${className}`} aria-hidden="true">
          <path d="m12 8.2 6.3-3.2m-12.6 0L12 8.2m0 0v7.6m6.3-10.8V18.1L12 21.2 5.7 18.1V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}
