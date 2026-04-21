import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="px-6 pt-8 pb-32 max-w-[440px] md:max-w-none mx-auto w-full md:px-8">
      <div className="rounded-[28px] bg-[linear-gradient(135deg,#0d74c8_0%,#7bc6ff_100%)] px-6 py-8 text-white shadow-[0_18px_40px_rgba(13,116,200,0.22)] md:p-10">
        <p className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.28em] text-white/75">POS AI</p>
        <h1 className="mt-3 text-[28px] md:text-3xl font-black tracking-tight">{title}</h1>
        <p className="mt-3 max-w-[26ch] md:max-w-md text-sm md:text-base leading-6 text-white/85">{description}</p>
      </div>

      <div className="mt-5 rounded-[24px] border border-[#edf4fa] bg-white px-5 py-5 md:p-6 shadow-[0_10px_30px_rgba(111,152,193,0.1)]">
        <p className="text-[12px] md:text-sm font-extrabold uppercase tracking-[0.2em] text-[#6f8daa]">Status Halaman</p>
        <p className="mt-3 text-[15px] md:text-base font-semibold text-[#17324d]">{description}</p>
      </div>
    </div>
  );
}
