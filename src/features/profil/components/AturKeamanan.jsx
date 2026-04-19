import React, { useState } from 'react';

const pinIndicators = Array.from({ length: 6 }, (_, index) => index)
const keypadRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

function PinDot({ active }) {
  return <span className={`h-3 w-3 rounded-full ${active ? 'bg-[#0E7BD3]' : 'bg-[#C7E3F5]'} transition-colors duration-200`} />
}

function KeyButton({ label, tone = 'default', onClick, children }) {
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

export default function AturKeamanan({ onBack }) {
  const [pin, setPin] = useState('');

  const handleKeyPress = (key) => {
    if (pin.length < 6) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 6) {
        setTimeout(() => {
          alert('PIN berhasil diatur!');
          if (onBack) onBack();
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen w-full max-w-[440px] bg-[linear-gradient(180deg,#E9F4FB_0%,#F5FBFE_100%)] shadow-2xl">
        <div className="px-6 pb-10 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-[#17324D]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Atur PIN Keamanan
          </button>

          <div className="mt-14 flex flex-col items-center text-center">
            <div className="flex h-[118px] w-[118px] items-center justify-center rounded-full bg-[#DDF0FB]">
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#0E7BD3] text-white shadow-[0_18px_30px_rgba(14,123,211,0.28)]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 17C13.66 17 14.99 15.66 14.99 14C14.99 12.34 13.66 11 12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <h1 className="mt-10 text-[28px] font-black tracking-tight text-[#17324D]">
              Masukkan 6 Digit PIN Baru Anda
            </h1>
            <p className="mt-3 max-w-[28ch] text-[14px] leading-6 text-[#62809A]">
              PIN ini akan digunakan untuk keamanan akses transaksi dan pengaturan sensitif.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {pinIndicators.map((index) => (
                <PinDot key={index} active={index < pin.length} />
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-3">
            {keypadRows.flat().map((key) => (
              <KeyButton key={key} label={key} onClick={() => handleKeyPress(key)} />
            ))}
            <div />
            <KeyButton label="0" onClick={() => handleKeyPress('0')} />
            <KeyButton tone="danger" onClick={handleDelete}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 5H9L4 12L9 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM17.59 15L16.17 16.41L13 13.24L9.83 16.41L8.41 15L11.59 11.83L8.41 8.66L9.83 7.24L13 10.41L16.17 7.24L17.59 8.66L14.41 11.83L17.59 15Z"
                  fill="currentColor"
                />
              </svg>
            </KeyButton>
          </div>

          <div className="mx-auto mt-14 h-1 w-[120px] rounded-full bg-[#D5E7F4]" />
        </div>
      </div>
    </div>
  )
}
