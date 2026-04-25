import React, { useState } from 'react';

export default function FAQItem({ question, answer, isExpanded = false }) {
  const [isOpen, setIsOpen] = React.useState(isExpanded);

  React.useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 md:p-5 hover:bg-slate-50/50 transition-colors text-left"
      >
        <span className="text-sm md:text-[15px] font-semibold text-slate-800">{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 text-sm text-slate-600 leading-relaxed">
          {Array.isArray(answer) ? (
            <ol className="list-decimal pl-5 space-y-2">
              {answer.map((step, idx) => (
                <li key={idx} className="pl-1">{step}</li>
              ))}
            </ol>
          ) : (
            answer
          )}
        </div>
      )}
    </div>
  );
}
