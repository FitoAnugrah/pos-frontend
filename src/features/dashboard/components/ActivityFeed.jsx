import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appText from '../../../constants/appText';
import api from '../../../utils/api';
import { IconWarning, IconInfo, IconDefault } from '../../../components/ui/icons';

// Helper component for feed icons
const FeedIcon = ({ type }) => {
  switch (type) {
    case 'warning':
       return <IconWarning className="w-5 h-5 text-amber-500" />;
    case 'info':
       return <IconInfo className="w-5 h-5 text-blue-500" />;
    default:
       return <IconDefault className="w-5 h-5 text-slate-400" />;
  }
};

const getIconBg = (type) => {
  if (type === 'warning') return 'bg-amber-50 border border-amber-100/50';
  if (type === 'info') return 'bg-blue-50 border border-blue-100/50';
  return 'bg-slate-50 border border-slate-100/50';
};

export default function ActivityFeed() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/products/activity-logs')
      .then(res => setLogs(res.data.slice(0, 3))) // Show only top 3
      .catch(console.error);
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-3 px-1">
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{appText.activity.title}</p>
        <button 
          onClick={() => navigate('/aktivitas')}
          className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 px-3 py-1.5 rounded-full transition-colors duration-200 tracking-wider uppercase"
        >
          {appText.activity.seeAll}
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        {logs.map((item) => (
          <button 
            key={item.id} 
            className="w-full text-left flex items-start gap-4 p-4 md:p-5 border-b border-slate-50 last:border-0 transition-all duration-300 hover:bg-slate-50/80 active:bg-slate-100"
          >
            <div className={`mt-0.5 flex-shrink-0 p-2.5 rounded-full ${getIconBg(item.type === 'stock' ? 'warning' : 'info')} shadow-sm`}>
              <FeedIcon type={item.type === 'stock' ? 'warning' : 'info'} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-sm font-bold text-slate-800 truncate leading-tight">{item.productName}</h4>
              <p className="text-xs font-medium text-slate-500 truncate mt-1">{item.description}</p>
            </div>
            <div className="text-[10px] font-bold text-slate-400 pt-1 tracking-wider uppercase">
              {item.time}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}


