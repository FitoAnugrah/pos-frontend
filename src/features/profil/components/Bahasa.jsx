import React, { useState } from 'react';

const languages = [
  { id: 'id', name: 'Bahasa Indonesia', nativeName: 'INDONESIAN', flag: '🇮🇩' },
  { id: 'en', name: 'English', nativeName: 'UNITED STATES', flag: '🇺🇸' },
  { id: 'ms', name: 'Malay', nativeName: 'MALAYSIA', flag: '🇲🇾' },
  { id: 'zh', name: 'Chinese', nativeName: 'MANDARIN', flag: '🇨🇳' },
];

export default function Bahasa({ onBack, onSave, currentLang = 'id' }) {
  const [selectedLang, setSelectedLang] = useState(currentLang);

  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen w-full max-w-[440px] bg-[linear-gradient(180deg,#F2F8FC_0%,#F8FBFE_100%)] shadow-2xl overflow-y-auto pb-10">
        <div className="px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-semibold text-[#2D4A86] hover:text-[#1A2E5B] transition-colors p-1 -ml-1 rounded-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Select Language
            </button>
            <button 
              type="button" 
              onClick={() => onSave && onSave(selectedLang)} 
              className="text-sm font-bold text-[#3B69D6] hover:text-[#234599] transition-colors p-1"
            >
              Save
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#E8F2FA] py-3 text-[#31577D]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] font-medium">Choose your preferred system language</span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                  selectedLang === lang.id
                    ? 'border-[#0E7BD3] bg-white shadow-[0_8px_20px_rgba(14,123,211,0.12)]'
                    : 'border-transparent bg-white shadow-sm hover:bg-[#F8FBFE]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F2F6F9] text-[20px]">
                    {lang.flag}
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-bold text-[#17324D]">{lang.name}</p>
                    <p className="mt-0.5 text-[10px] font-bold tracking-wider text-[#7896B0] uppercase">{lang.nativeName}</p>
                  </div>
                </div>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  selectedLang === lang.id ? 'border-[#0E7BD3] bg-[#0E7BD3] text-white' : 'border-[#C2D6E6] bg-transparent'
                }`}>
                  {selectedLang === lang.id && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="rounded-2xl bg-[#E8F3FA] p-5">
              <svg className="mb-3 text-[#1466B8]" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h7M9 3v2c0 4.418-2.239 8-5 8"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9c-.066.27-.123.543-.17.818C4.55 11.455 5.253 13 6.5 13c1.785 0 2.946-1.579 3.256-3M19 11l-4.5 9m0 0l-4.5-9m4.5 9V11"/>
              </svg>
              <h4 className="text-[14px] font-bold text-[#1F3A56]">Auto-Translation</h4>
              <p className="mt-1 text-[12px] leading-5 text-[#5B7997]">Transactions and receipts will be automatically formatted based on your selection.</p>
            </div>

            <div className="rounded-2xl bg-[#E8F3FA] p-5">
              <svg className="mb-3 text-[#1466B8]" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <h4 className="text-[14px] font-bold text-[#1F3A56]">Cloud Sync</h4>
              <p className="mt-1 text-[12px] leading-5 text-[#5B7997]">Language preferences are synced across all your POS terminals instantly.</p>
            </div>
          </div>

          <p className="mt-10 text-center text-[10px] font-bold tracking-[0.2em] text-[#93B0C9] uppercase">
            The Global POS System
          </p>
        </div>
      </div>
    </div>
  );
}
