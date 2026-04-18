export default function ActionButton({
  label,
  icon,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-[#0d74c8] text-white shadow-[0_12px_26px_rgba(13,116,200,0.25)] hover:bg-[#095fa5]',
    secondary: 'bg-[#d9e8fb] text-[#4d6a8a] hover:bg-[#cee1f8]',
    light: 'bg-white text-[#0d74c8] shadow-[0_10px_20px_rgba(111,152,193,0.08)] hover:bg-[#f5fbff]',
    danger: 'border border-[#f3c9cf] bg-white text-[#d63f50] hover:bg-[#fff6f7]',
  }

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 rounded-[14px] px-4 py-3.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {label}
    </button>
  )
}
