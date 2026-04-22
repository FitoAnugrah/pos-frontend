export default function ProductThumb({ kind, className = 'h-14 w-14 rounded-2xl', large = false, accent, src, alt = 'Foto produk' }) {
  if (src) {
    const fitClassName = /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className) ? '' : ' object-cover'
    return <img src={src} alt={alt} className={`${className}${fitClassName}`} />
  }

  const common = `relative overflow-hidden ${className}`
  const labelClass = large ? 'text-[11px] tracking-[0.22em]' : 'text-[7px] tracking-[0.24em]'

  if (kind === 'rice') {
    return (
      <div className={`${common} bg-[radial-gradient(circle_at_top,#d8f0ff_10%,#6ec5e8_45%,#1b8cb5_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]`}>
        {large ? (
          <>
            <div className={`absolute inset-0 bg-gradient-to-b ${accent?.shell ?? 'from-[#5b2f74] via-[#61307a] to-[#4c2866]'}`} />
            <div className="absolute inset-x-[18%] bottom-[14%] top-[12%] rounded-[18%] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.02)_18%,rgba(0,0,0,0.08)_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08),inset_0_16px_30px_rgba(255,255,255,0.18)]" />
            <div className="absolute inset-x-[19.5%] top-[15%] h-6 rounded-t-[999px] border-t border-white/22" />
            <div className="absolute inset-x-[19.5%] bottom-[15%] h-6 rounded-b-[999px] border-b border-white/16" />
            <div className="absolute left-1/2 top-[17%] h-[62%] w-[46%] -translate-x-1/2 rounded-[999px] border border-[#0b2f5e]/60 bg-[radial-gradient(circle_at_30%_30%,#2b90d3_0%,#09508f_72%,#083660_100%)] shadow-[inset_0_4px_12px_rgba(255,255,255,0.18)]" />
            <div className="absolute left-[36%] top-[23%] h-4 w-10 rounded-full bg-[#ffd565] blur-[1px]" />
            <div className="absolute right-[35%] top-[27%] h-3 w-8 rounded-full bg-[#f8b52d] blur-[1px]" />
            <div className="absolute left-[34%] top-[24%] h-4 w-10 rounded-full border-t-[5px] border-[#ffd565] rotate-[-12deg]" />
            <div className="absolute right-[34%] top-[26%] h-4 w-9 rounded-full border-t-[5px] border-[#f7b525] rotate-[28deg]" />
            <div className="absolute left-[36%] bottom-[28%] h-4 w-12 rounded-full border-b-[6px] border-[#f4b21d] rotate-[8deg]" />
            <div className="absolute right-[36%] bottom-[23%] h-3 w-8 rounded-full border-b-[5px] border-[#ffd565] rotate-[-18deg]" />
            <div className="absolute inset-x-0 top-[37%] text-center text-[44px] font-black leading-none tracking-tight text-white">BERAS</div>
            <div className="absolute inset-x-0 top-[54%] text-center text-[22px] font-light tracking-[0.12em] text-white">PREMIUM</div>
            <div className="absolute inset-x-0 bottom-[22%] text-center text-[6px] font-bold tracking-[0.3em] text-white/80">
              BERKUALITAS TINGGI
            </div>
            <div className="absolute inset-x-0 bottom-[16%] text-center text-[13px] font-bold tracking-[0.16em] text-white">
              SAFE WORK
            </div>
          </>
        ) : (
          <>
            <div className="absolute left-1/2 top-2 h-9 w-8 -translate-x-1/2 rounded-[30%] bg-white/90" />
            <div className="absolute left-1/2 top-5 h-4 w-7 -translate-x-1/2 rounded-md bg-[#1580b0]" />
            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 font-extrabold text-white ${labelClass}`}>BERAS</div>
          </>
        )}
      </div>
    )
  }

  if (kind === 'drink') {
    return (
      <div className={`${common} bg-[linear-gradient(160deg,#eef2f7_0%,#c9d5e2_100%)]`}>
        <div className="absolute inset-x-0 bottom-0 h-7 bg-[linear-gradient(180deg,transparent_0%,rgba(22,29,39,0.18)_100%)]" />
        <div className={`absolute left-1/2 ${large ? 'top-[22%] h-[46%] w-[16%]' : 'top-5 h-7 w-4'} -translate-x-1/2 rounded-b-lg rounded-t-md bg-[#1f2937]`} />
        <div className={`absolute left-1/2 ${large ? 'top-[14%] h-[12%] w-[10%]' : 'top-2 h-4 w-2.5'} -translate-x-1/2 rounded-full bg-[#1f2937]`} />
        <div className={`absolute left-1/2 ${large ? 'top-[34%] h-[8%] w-[36%]' : 'top-6 h-2 w-6'} -translate-x-1/2 rounded-full bg-[#ef4444]`} />
      </div>
    )
  }

  if (kind === 'chips') {
    return (
      <div className={`${common} bg-[linear-gradient(145deg,#35210d_0%,#8b4c1d_55%,#1f1308_100%)]`}>
        <div className={`absolute left-1/2 ${large ? 'top-[15%] h-[58%] w-[28%]' : 'top-2 h-10 w-6'} -translate-x-1/2 rounded-lg bg-[linear-gradient(180deg,#ffd669_0%,#c96b19_70%,#8c3f08_100%)]`} />
        <div className={`absolute left-1/2 ${large ? 'top-[35%] h-[7%] w-[38%]' : 'top-5 h-2 w-8'} -translate-x-1/2 rounded-full bg-[#b91c1c]/90`} />
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 font-black text-[#fff2bd] ${large ? 'text-[14px] tracking-[0.3em]' : 'text-[8px] tracking-[0.3em]'}`}>
          CRP
        </div>
      </div>
    )
  }

  if (kind === 'candy') {
    return (
      <div className={`${common} bg-[radial-gradient(circle_at_35%_30%,#252525_0%,#141414_65%,#090909_100%)]`}>
        <div className={`absolute ${large ? 'left-[18%] top-[48%] h-[14%] w-[14%]' : 'left-2 top-7 h-4 w-4'} rounded-full bg-[#f87171]`} />
        <div className={`absolute ${large ? 'left-[40%] top-[34%] h-[16%] w-[16%]' : 'left-5 top-5 h-4 w-4'} rounded-full bg-[#ef4444]`} />
        <div className={`absolute ${large ? 'right-[18%] top-[44%] h-[14%] w-[14%]' : 'right-2 top-6 h-4 w-4'} rounded-full bg-[#fb7185]`} />
        <div className={`absolute ${large ? 'left-[12%] top-[40%] h-[10%] w-[10%] border-l-[6px] border-t-[6px]' : 'left-1 top-6 h-3 w-3 border-l-4 border-t-4'} rotate-45 border-white/70`} />
        <div className={`absolute ${large ? 'right-[12%] top-[38%] h-[10%] w-[10%] border-r-[6px] border-b-[6px]' : 'right-1 top-5 h-3 w-3 border-r-4 border-b-4'} rotate-45 border-white/70`} />
      </div>
    )
  }

  return (
    <div className={`${common} bg-[linear-gradient(145deg,#0a1d22_0%,#103d4a_50%,#50331f_100%)]`}>
      <div className={`absolute ${large ? 'bottom-[15%] left-[18%] h-[18%] w-[52%]' : 'bottom-2 left-2 h-5 w-10'} rounded-full bg-[#714726]`} />
      <div className={`absolute ${large ? 'left-[18%] top-[30%] h-[15%] w-[15%]' : 'left-3 top-4 h-4 w-4'} rounded-full bg-[#f3e7cf]`} />
      <div className={`absolute ${large ? 'left-[42%] top-[24%] h-[15%] w-[15%]' : 'left-7 top-3 h-4 w-4'} rounded-full bg-[#fff1d9]`} />
      <div className={`absolute ${large ? 'left-[30%] top-[46%] h-[15%] w-[15%]' : 'left-5 top-7 h-4 w-4'} rounded-full bg-[#e9dcc0]`} />
    </div>
  )
}
