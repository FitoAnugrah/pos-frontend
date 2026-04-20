export default function PageCanvas({
  children,
  frameClassName = 'border border-[#dadfe6] md:border-slate-200 bg-[#f4f9fd] md:rounded-2xl',
  contentClassName = 'px-4 pb-5 pt-4',
}) {
  return (
    <div className="min-h-screen bg-[#1b1b1c] md:bg-slate-50 md:flex md:items-center md:justify-center md:py-10 px-3 py-5 text-[#17324d] font-sans">
      <div className="mx-auto w-full max-w-[430px]">
        <section className={`overflow-hidden shadow-2xl md:shadow-xl ${frameClassName}`}>
          <div className={contentClassName}>{children}</div>
        </section>
      </div>
    </div>
  )
}

