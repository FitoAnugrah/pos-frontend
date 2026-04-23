import React from 'react';

export default function PinDot({ active }) {
  return <span className={`h-3 w-3 rounded-full ${active ? 'bg-[#0E7BD3]' : 'bg-[#C7E3F5]'} transition-colors duration-200`} />
}
