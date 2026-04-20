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
