import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {
  ArrowLeftIcon,
  WarningIcon,
  CheckCircleIcon,
  CheckCircleSolidIcon,
  InfoIcon,
  ChartIcon,
} from '../../components/ui/icons';

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await api.get('/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifs();
  }, []);

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const markRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const getIconAndStyle = (type) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-orange-100', text: 'text-orange-600',
          icon: <WarningIcon className="w-6 h-6" />
        };
      case 'success':
        return {
          bg: 'bg-blue-100', text: 'text-blue-600',
          icon: <CheckCircleSolidIcon className="w-6 h-6" />
        };
      case 'insight':
        return {
          bg: 'bg-[#0A6CBF]', text: 'text-white',
          icon: <ChartIcon className="w-5 h-5 text-white" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-100', text: 'text-slate-500',
          icon: <InfoIcon className="w-6 h-6" />
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl lg:max-w-4xl bg-slate-50 min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col pb-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 z-20 bg-slate-50/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors -ml-2">
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-[18px] font-extrabold text-blue-600">Notifications</h1>
          </div>
          <button 
            onClick={markAllRead}
            className="text-[14px] font-bold text-blue-600 hover:opacity-80 transition-opacity"
          >
            Clear All
          </button>
        </div>

        <div className="px-5 pt-2">
          
          {loading ? (
            <div className="text-center py-8 text-slate-500 font-medium">Memuat notifikasi...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-500 font-medium">Belum ada notifikasi.</div>
          ) : (
            <div className="mb-6">
              <div className="flex flex-col gap-3">
                {notifications.map(notif => {
                  const style = getIconAndStyle(notif.type);
                  
                  if (notif.type === 'insight') {
                    return (
                      <div 
                        key={notif.id}
                        onClick={() => !notif.is_read && markRead(notif.id)}
                        className={`bg-[#0A6CBF] rounded-[28px] p-6 shadow-lg shadow-[#0A6CBF]/20 flex flex-col mt-2 cursor-pointer ${notif.is_read ? 'opacity-80' : ''}`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center">
                            {style.icon}
                          </div>
                          <span className="text-[10px] font-bold text-[#D1E4F5] tracking-widest uppercase">INSIGHT HARIAN</span>
                        </div>
                        <h3 className="text-[18px] font-extrabold text-white mb-2 leading-tight">
                          {notif.title}
                        </h3>
                        <p className="text-[13px] font-medium text-[#D1E4F5] leading-relaxed mb-6">
                          {notif.body}
                        </p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate('/laporan'); }}
                          className="bg-white text-blue-600 rounded-full py-3 px-6 text-[12px] font-extrabold tracking-wider w-fit hover:bg-slate-50 transition-colors"
                        >
                          LIHAT LAPORAN
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={notif.id}
                      onClick={() => !notif.is_read && markRead(notif.id)}
                      className={`bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${notif.is_read ? 'opacity-60' : ''}`}
                    >
                      <div className={`${style.bg} ${style.text} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        {style.icon}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start">
                          <h3 className={`text-[15px] font-extrabold ${notif.is_read ? 'text-slate-500' : 'text-slate-800'}`}>
                            {notif.title}
                          </h3>
                          <span className="text-[11px] font-medium text-slate-500 mt-0.5">
                            {new Date(notif.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
                          {notif.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
