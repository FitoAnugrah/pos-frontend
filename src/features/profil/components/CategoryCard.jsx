import React from 'react';

export default function CategoryCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="text-sm md:text-[15px] font-bold text-slate-800">{title}</h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
