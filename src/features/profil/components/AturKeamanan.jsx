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
    <div className="min-h-screen w-full bg-slate-50 font-sans flex items-center justify-center p-4 md:p-8">
      <div className="w-full md:w-2/3 lg:w-1/2 max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col items-center">
        <div className="px-4 md:px-8 pb-8 md:pb-12 pt-6 w-full">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors p-1 -ml-1 rounded-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Atur PIN Keamanan
          </button>

          <div className="mt-10 flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 17C13.66 17 14.99 15.66 14.99 14C14.99 12.34 13.66 11 12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <h1 className="mt-8 text-xl font-bold tracking-tight text-slate-800">
              Masukkan 6 Digit PIN Baru Anda
            </h1>
            <p className="mt-2 max-w-[28ch] text-sm leading-6 text-slate-500 font-medium">
              PIN ini akan digunakan untuk keamanan akses transaksi dan pengaturan sensitif.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {pinIndicators.map((index) => (
                <PinDot key={index} active={index < pin.length} />
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 w-full">
            {keypadRows.flat().map((key) => (
              <KeyButton key={key} label={key} onClick={() => handleKeyPress(key)} />
            ))}
            <div />
            <KeyButton label="0" onClick={() => handleKeyPress('0')} />
            <div className="flex h-[56px] items-center justify-center rounded-xl text-24px font-black tracking-tight transition-colors bg-red-50 text-red-600 active:bg-red-100 cursor-pointer" onClick={handleDelete}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 5H9L4 12L9 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM17.59 15L16.17 16.41L13 13.24L9.83 16.41L8.41 15L11.59 11.83L8.41 8.66L9.83 7.24L13 10.41L16.17 7.24L17.59 8.66L14.41 11.83L17.59 15Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <div className="mx-auto mt-12 h-1.5 w-32 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  )
}
