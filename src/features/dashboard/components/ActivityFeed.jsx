import React from 'react';
import dashboardText from '../text';

// Helper component for feed icons
const FeedIcon = ({ type }) => {
  switch (type) {
    case 'warning':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500">
          <path d="M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z" fill="currentColor"/>
        </svg>
      );
    case 'info':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
          <path d="M16 11C17.65 11 19 9.65 19 8C19 6.35 17.65 5 16 5C14.35 5 13 6.35 13 8C13 9.65 14.35 11 16 11ZM8 11C9.65 11 11 9.65 11 8C11 6.35 9.65 5 8 5C6.35 5 5 6.35 5 8C5 9.65 6.35 11 8 11ZM16 13C13.67 13 9 14.17 9 16.5V19H23V16.5C23 14.17 18.33 13 16 13ZM8 13C7.75 13 7.46 13.04 7.16 13.09C8.32 13.75 9 14.54 9 15.5V19H1V16.5C1 14.17 5.67 13 8 13Z" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 17H9V11H7V17ZM11 17H13V7H11V17ZM15 17H17V14H15V17Z" fill="currentColor"/>
        </svg>
      );
  }
};

const getBorderColor = (type) => {
  if (type === 'warning') return 'border-l-yellow-400';
  if (type === 'info') return 'border-l-blue-400';
  return 'border-l-gray-300';
};

export default function ActivityFeed() {
  return (
    <div className="px-6 py-4 mb-[80px]">
      <div className="flex justify-between items-center mb-3 px-1">
        <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{dashboardText.activity.title}</p>
        <button className="text-[10px] font-bold text-[#0677CD] bg-blue-50 hover:bg-blue-100 active:bg-blue-200 px-3 py-1.5 rounded-full transition-colors duration-200 tracking-wider uppercase">
          {dashboardText.activity.seeAll}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {dashboardText.activity.items.map((item) => (
          <button 
            key={item.id} 
            className={`w-full text-left flex items-center gap-4 bg-white p-4 pr-5 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.01)] border-y border-r border-[#F0F4F8] border-l-[4px] ${getBorderColor(item.type)} transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100`}
          >
            <div className="flex-shrink-0">
              <FeedIcon type={item.type} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-[#032537] truncate">{item.title}</h4>
              <p className="text-[11px] font-medium text-gray-400 truncate mt-0.5">{item.desc}</p>
            </div>
            <div className="text-[11px] font-bold text-gray-400">
              {item.time}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
