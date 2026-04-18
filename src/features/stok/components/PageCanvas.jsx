export default function PageCanvas({
  children,
  frameClassName = 'border border-[#dadfe6] bg-[#f4f9fd]',
  contentClassName = 'px-4 pb-5 pt-4',
}) {
  return (
    <div className="min-h-screen bg-[#1b1b1c] px-3 py-5 text-[#17324d]">
      <div className="mx-auto max-w-[430px]">
        <section className={`overflow-hidden shadow-[0_18px_60px_rgba(7,35,65,0.32)] ${frameClassName}`}>
          <div className={contentClassName}>{children}</div>
        </section>
      </div>
    </div>
  )
}
