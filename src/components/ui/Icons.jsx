import React from 'react';

export const IconUserCircle = ({ className = "w-5 h-5", color = "#38Bdf8" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color} />
  </svg>
);

export const IconBell = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill={color} />
  </svg>
);

export const IconWarning = ({ className = "w-6 h-6 text-yellow-500", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z" fill={color}/>
  </svg>
);

export const IconInfo = ({ className = "w-6 h-6 text-blue-500", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 11C17.65 11 19 9.65 19 8C19 6.35 17.65 5 16 5C14.35 5 13 6.35 13 8C13 9.65 14.35 11 16 11ZM8 11C9.65 11 11 9.65 11 8C11 6.35 9.65 5 8 5C6.35 5 5 6.35 5 8C5 9.65 6.35 11 8 11ZM16 13C13.67 13 9 14.17 9 16.5V19H23V16.5C23 14.17 18.33 13 16 13ZM8 13C7.75 13 7.46 13.04 7.16 13.09C8.32 13.75 9 14.54 9 15.5V19H1V16.5C1 14.17 5.67 13 8 13Z" fill={color}/>
  </svg>
);

export const IconDefault = ({ className = "w-6 h-6 text-gray-400", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 17H9V11H7V17ZM11 17H13V7H11V17ZM15 17H17V14H15V17Z" fill={color}/>
  </svg>
);

export const IconTerminal = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 6H20V16H4V6ZM4 4C2.9 4 2 4.9 2 6V16C2 17.1 2.9 18 4 18H14V20H10V22H14H18V20H16V18H20C21.1 18 22 17.1 22 16V6C22 4.9 21.1 4 20 4H4Z" fill={color} />
  </svg>
);

export const IconRiwayat = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V12.25L15.6 15L16.35 13.77L12.5 11.47V7Z" fill={color}/>
  </svg>
);

export const IconStok = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 4H16V2H8V4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V6C22 4.9 21.1 4 20 4ZM14 10H10V8H14V10ZM18 10H16V8H18V10ZM12 4H10V2H14V4H12ZM8 10H6V8H8V10Z" fill={color} />
  </svg>
);

export const IconPengaturan = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19.14 12.94C19.22 12.64 19.28 12.33 19.28 12C19.28 11.67 19.22 11.36 19.14 11.06L21.09 9.53C21.27 9.39 21.32 9.13 21.2 8.93L19.35 5.73C19.23 5.53 18.98 5.44 18.77 5.54L16.46 6.47C15.98 6.1 15.47 5.8 14.9 5.56L14.56 3.1C14.52 2.86 14.32 2.68 14.08 2.68H10.38C10.14 2.68 9.94 2.85 9.9 3.09L9.56 5.55C8.99 5.79 8.48 6.09 8.01 6.46L5.72 5.53C5.51 5.45 5.25 5.51 5.14 5.72L3.29 8.91C3.17 9.11 3.22 9.37 3.4 9.51L5.35 11.04C5.27 11.34 5.21 11.66 5.21 11.98C5.21 12.3 5.27 12.62 5.35 12.92L3.4 14.45C3.22 14.59 3.17 14.85 3.29 15.05L5.14 18.25C5.25 18.45 5.51 18.53 5.72 18.44L8.01 17.51C8.49 17.88 9 18.18 9.56 18.42L9.9 20.88C9.94 21.12 10.14 21.3 10.38 21.3H14.08C14.32 21.3 14.52 21.13 14.56 20.89L14.9 18.43C15.47 18.19 15.98 17.89 16.45 17.52L18.74 18.45C18.95 18.53 19.21 18.47 19.32 18.26L21.17 15.06C21.29 14.86 21.24 14.6 21.06 14.46L19.14 12.94ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z" fill="currentColor"/>
  </svg>
);

export const IconPanel = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19.14 12.936C19.224 12.636 19.284 12.324 19.284 12C19.284 11.676 19.224 11.364 19.14 11.064L21.096 9.528C21.276 9.384 21.324 9.132 21.204 8.928L19.356 5.724C19.236 5.52 18.984 5.436 18.768 5.532L16.464 6.468C15.984 6.096 15.468 5.796 14.904 5.556L14.556 3.096C14.52 2.856 14.316 2.676 14.076 2.676H10.38 5.724C5.52 5.844 5.436 6.096 5.532 6.312L6.468 9.948C6.096 10.428 5.796 10.944 5.556 11.508L3.096 11.856C2.856 11.892 2.676 12.096 2.676 12.336V16.032C2.676 16.272 2.856 16.476 3.096 16.512L5.556 16.86C5.796 17.424 6.096 17.94 6.468 18.42L5.532 20.724C5.436 20.94 5.52 21.192 5.724 21.312L9.42 23.16C9.624 23.28 9.876 23.232 10.056 23.052L11.592 21.096C11.892 21.18 12.204 21.24 12.528 21.24C12.852 21.24 13.164 21.18 13.464 21.096L15 23.052C15.18 23.232 15.432 23.28 15.636 23.16L19.332 21.312C19.536 21.192 19.62 20.94 19.524 20.724L18.588 18.42C19.068 17.94 19.368 17.424 19.608 16.86L22.068 16.512C22.308 16.476 22.488 16.272 22.488 16.032V12.336C22.5 12.096 22.32 11.892 22.08 11.856L19.14 12.936ZM12.084 15.54C10.128 15.54 8.544 13.956 8.544 12C8.544 10.044 10.128 8.46 12.084 8.46C14.04 8.46 15.624 10.044 15.624 12C15.624 13.956 14.04 15.54 12.084 15.54Z" fill={color}/>
  </svg>
);

// =============================================================================
// Shared Icon Library — POS A'i (Migrated from stok/member/riwayat/notifikasi)
// Single source of truth for all feature SVG icons.
// Usage: import { ArrowLeftIcon, SearchIcon } from '@/components/ui/icons'
// =============================================================================

// ─── Navigation & Actions ────────────────────────────────────────────────────

export function ArrowLeftIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M15 6 9 12l6 6M10 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRightIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDownIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DotsIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  )
}

export function MoreVerticalIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}

// ─── CRUD & Edit ─────────────────────────────────────────────────────────────

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

// ─── Status & Feedback ───────────────────────────────────────────────────────

export function CheckIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="m6 12 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckCircleIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export function CheckCircleSolidIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

export function WarnIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 8v5m0 3h.01M10.3 4.8 3.9 16a2 2 0 0 0 1.74 3h12.72A2 2 0 0 0 20.1 16L13.7 4.8a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WarningIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export function InfoIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

// ─── Search & Scan ───────────────────────────────────────────────────────────

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

// ─── Commerce & Finance ──────────────────────────────────────────────────────

export function MoneyIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="6.5" width="17" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.5 10h.01M17.5 14h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function WalletIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

export function BankIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <rect x="5" y="14" width="2" height="4" />
      <rect x="11" y="14" width="2" height="4" />
      <rect x="17" y="14" width="2" height="4" />
      <path d="M3 10L12 3l9 7" />
    </svg>
  )
}

export function TagIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="m11 4 8 8-7.5 7.5L3.99 12V4H11Zm-3.25 3.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ReceiptIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

export const ReceiptSheetIcon = ReceiptIcon

export function BagIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export function GiftIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

export function RefundIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 14 4 9 9 4" />
      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
    </svg>
  )
}

// ─── Inventory & Product ─────────────────────────────────────────────────────

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

// ─── Math Controls ───────────────────────────────────────────────────────────

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

// ─── Users & People ──────────────────────────────────────────────────────────

export function UserIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function UsersIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

export function UserPlusIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}

// ─── Communication ───────────────────────────────────────────────────────────

export function PhoneIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function MailIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function BellIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export function ShareIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

export function PrinterIcon({ className = 'h-5 w-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

// ─── Time & Calendar ─────────────────────────────────────────────────────────

export function ClockIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 6.5v5l3 1.8M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CalendarIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M7 4.5v3M17 4.5v3M5.5 8h13M6.5 5.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export function ChartIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M5 19V9m7 10V5m7 14v-7M3 19h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

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

// ─── Stok-specific compound components ───────────────────────────────────────

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
