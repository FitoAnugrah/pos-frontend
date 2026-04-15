import logoMark from '../../../../assets/posai-logo.png'
import frame01LupaKataSandiText from './text'

function SecurityMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-[17px] w-[17px] text-current"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L5 6V11.3C5 16 8 20.4 12 21C16 20.4 19 16 19 11.3V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 12L11.1 13.5L14.5 10.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Frame01LupaKataSandiPosAi() {
  return (
    <main className="min-h-screen bg-[#DCE7F0] pb-[6vh] pt-[6vh] text-[#0A2A3D]">
      <div className="mx-auto w-full max-w-[399px]">
        <section className="mx-[24px] min-h-[573px] rounded-[30px] bg-[#FCFEFF] px-[28px] pb-[32px] pt-[28px]">
          <img
            src={logoMark}
            alt={`${frame01LupaKataSandiText.brand} logo`}
            className="mx-auto h-[63px] w-[64px] rounded-[16px]"
          />
          <p className="mt-[20px] text-center text-[24px] font-extrabold leading-none tracking-[-0.03em] text-[#032537]">
            {frame01LupaKataSandiText.brand}
          </p>

          <h1 className="mt-[46px] text-center text-[22px] font-extrabold leading-[1.2] tracking-[-0.025em] text-[#032537]">
            {frame01LupaKataSandiText.title}
          </h1>
          <p className="mx-auto mt-[10px] max-w-[256px] text-center text-[15px] font-medium leading-[1.5] tracking-[-0.005em] text-[#5B7496]">
            {frame01LupaKataSandiText.description}
          </p>

          <form className="mt-[34px]" action="#" method="post">
            <label
              className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#4A5560]"
              htmlFor="email"
            >
              {frame01LupaKataSandiText.emailLabel}
            </label>

            <div className="mt-[10px] flex h-[46px] items-center gap-[10px] rounded-[14px] bg-[#E8F4FE] px-[15px]">
              <span aria-hidden="true" className="text-[26px] font-bold leading-none text-[#6383A9]">
                @
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={frame01LupaKataSandiText.emailPlaceholder}
                className="w-full bg-transparent text-[16px] font-medium tracking-[-0.01em] text-[#3C5D86] placeholder:text-[#B8C3CF] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-[22px] flex h-[50px] w-full items-center justify-center rounded-[14px] bg-[#0677CD] px-4 text-[16px] font-bold tracking-[-0.01em] text-white shadow-[0_22px_24px_-16px_rgba(70,129,176,0.55)] transition-transform duration-150 active:scale-[0.99]"
            >
              {frame01LupaKataSandiText.submitLabel}
              <span aria-hidden="true" className="ml-2 text-[20px] leading-none">
                &gt;
              </span>
            </button>
          </form>

          <div className="mt-[36px] border-t border-[#EEF2F6] pt-[30px] text-center">
            <a
              href="#"
              className="inline-flex items-center gap-[8px] text-[14px] font-bold tracking-[-0.01em] text-[#0A6DBA]"
            >
              <span aria-hidden="true" className="text-[18px] leading-none">
                &larr;
              </span>
              {frame01LupaKataSandiText.backToLogin}
            </a>
          </div>
        </section>

        <footer className="mt-[28px] flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#B5C1CE]">
          <SecurityMark />
          {frame01LupaKataSandiText.securityFooter}
        </footer>
      </div>
    </main>
  )
}
