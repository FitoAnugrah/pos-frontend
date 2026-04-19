function InputRow({ label, value, icon }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0A76CA]">{label}</p>
      <div className="flex items-center gap-3 rounded-[14px] bg-[#EAF4FB] px-4 py-3 text-[#23425D]">
        <span className="flex h-5 w-5 items-center justify-center text-[#5E7E99]">{icon}</span>
        <span className="text-[14px] font-medium">{value}</span>
      </div>
    </div>
  )
}

export default function EditInformasiAkun({ onBack, onSave, onOpenSecurity }) {
  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen w-full max-w-[440px] bg-[linear-gradient(180deg,#D8ECF9_0%,#EAF5FB_45%,#F6FBFE_100%)] shadow-2xl">
        <div className="px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-[#24425B]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit Account
            </button>

            <button type="button" onClick={onSave} className="text-sm font-medium text-[#1788E4]">
              Save
            </button>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="relative">
              <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-4 border-white bg-[radial-gradient(circle_at_top,#F4EEDC_0%,#E5DABF_100%)] shadow-[0_16px_30px_rgba(82,117,145,0.18)]">
                <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#243849] text-[#F0C56F]">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="button"
                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#147CD3] text-white shadow-[0_12px_24px_rgba(20,124,211,0.28)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 20H8L18.5 9.5C19.0304 8.96957 19.3284 8.25022 19.3284 7.5C19.3284 6.74978 19.0304 6.03043 18.5 5.5C17.9696 4.96957 17.2502 4.67157 16.5 4.67157C15.7498 4.67157 15.0304 4.96957 14.5 5.5L4 16V20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <h1 className="mt-4 text-[28px] font-black tracking-tight text-[#17324D]">Budi Santoso</h1>
            <p className="mt-1 text-center text-[13px] text-[#607C97]">Store Manager • POS Terminal #04</p>
          </div>

          <div className="mt-8 rounded-[26px] bg-white/90 px-5 py-6 shadow-[0_18px_45px_rgba(115,152,181,0.15)] backdrop-blur-sm">
            <div className="space-y-5">
              <InputRow
                label="Nama Lengkap"
                value="Budi Santoso"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />

              <InputRow
                label="Email"
                value="budi@posai.com"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6H4C2.9 6 2.01 6.9 2.01 8L2 20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM20 10L12 15L4 10V8L12 13L20 8V10Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />

              <InputRow
                label="No. Telepon"
                value="+62 812 3456 7890"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-[24px] bg-[#DCEFFA] px-5 py-5 shadow-[0_18px_35px_rgba(120,163,194,0.16)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-white text-[#0F7AD0]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 17C13.66 17 14.99 15.66 14.99 14C14.99 12.34 13.66 11 12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[16px] font-bold text-[#15344F]">Keamanan Akun</p>
                <p className="mt-1 text-[12px] text-[#5D7C96]">Ganti kata sandi &amp; PIN</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenSecurity}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#0E7BD3] text-white shadow-[0_14px_24px_rgba(14,123,211,0.25)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="mx-auto mt-8 max-w-[28ch] text-center text-[11px] leading-5 text-[#7890A5]">
            Perubahan informasi akun akan diverifikasi melalui email untuk menjaga keamanan instrumen finansial Anda.
          </p>
        </div>
      </div>
    </div>
  )
}
