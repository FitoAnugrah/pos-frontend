import React from 'react';

export default function KeyButton({ label, tone = 'default', onClick, children }) {
  const toneClass =
    tone === 'danger'
      ? 'bg-[#E5D8CF] text-[#8C4A0F] active:bg-[#D5C8BF]'
      : 'bg-white text-[#17324D] shadow-[0_12px_20px_rgba(150,182,208,0.12)] active:bg-slate-50'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[56px] items-center justify-center rounded-[14px] text-[24px] font-black tracking-tight transition-colors ${toneClass}`}
    >
      {children ?? label}
    </button>
  )
}
