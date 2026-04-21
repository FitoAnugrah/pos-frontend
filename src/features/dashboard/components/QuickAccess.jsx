import React from 'react';
import appText from '../../../constants/appText';
import { IconDefault, IconStok, IconPanel } from '../../../components/ui/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'member': return <IconDefault className="w-5 h-5 text-blue-600" />;
    case 'stok': return <IconStok className="w-5 h-5 text-blue-600" />;
    case 'laporan': return <IconDefault className="w-5 h-5 text-blue-600" />;
    case 'panel': return <IconPanel className="w-5 h-5 text-blue-600" />;
    default: return null;
  }
}

export default function QuickAccess({ onItemClick }) {
  return (
    <section>
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3 px-1">{appText.quickAccess.title}</p>
      <div className="grid grid-cols-2 gap-4">
        {appText.quickAccess.items.map((item) => (
          <button 
            key={item.id} 
            type="button"
            onClick={() => onItemClick?.(item.id)}
            className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 hover:shadow-md transition-all duration-300 active:scale-[0.98]"
          >
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <Icon name={item.id} />
            </div>
            <span className="text-sm font-semibold text-slate-800">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}


