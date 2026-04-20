import React, { useState, useRef, useEffect } from 'react';

const VerifikasiOtp = ({ onNavigate, onSuccess }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(54); // Sesuai dengan desain "00:54"
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Hanya ambil karakter terakhir jika user mengetik lebih dari 1 karakter di satu kotak
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Pindah fokus ke kotak berikutnya jika ada input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Pindah fokus ke kotak sebelumnya jika backspace ditekan pada kotak kosong
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(isNaN)) return;

    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      newOtp[index] = value;
    });
    setOtp(newOtp);

    // Pindah fokus ke kotak terakhir yang terisi
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      alert('Silakan lengkapi 6 digit OTP.');
      return;
    }
    // TODO: Implementasi verifikasi OTP
    alert(`Verifikasi OTP: ${otpValue}`);
    if (onSuccess) onSuccess();
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(new Array(6).fill(''));
      inputRefs.current[0].focus();
      // TODO: Panggil API kirim ulang OTP
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen flex flex-col items-center w-full max-w-[440px] bg-[#F4F7FB] shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div className="w-full px-6 py-6 flex items-center space-x-4">
          <a href="#" className="p-1 -ml-1 text-[#0057B3] hover:bg-blue-50 rounded-lg transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-[18px] font-black tracking-tight text-[#0F2035]">POS A'i</h1>
        </div>

        {/* Top Info Section */}
        <div className="flex flex-col items-center px-6 mt-4 mb-8 text-center w-full">
          {/* Email Check Icon Box */}
          <div className="w-[60px] h-[60px] bg-[#0E7BD3] rounded-[16px] flex items-center justify-center mb-6 shadow-[0_14px_24px_rgba(14,123,211,0.25)]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="18" height="13" rx="1.5" fill="white" />
              <path d="M2.5 4.5L10 10.5C10.6 11 11.4 11 12 10.5L19.5 4.5" stroke="#0E7BD3" strokeWidth="2.5" strokeLinejoin="miter" />
              <path d="M10 15L14 19L22 9" stroke="#0E7BD3" strokeWidth="6" strokeLinejoin="miter" strokeLinecap="butt" />
              <path d="M10 15L14 19L22 9" stroke="white" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt" />
            </svg>
          </div>
          
          <h2 className="text-[24px] font-black tracking-tight text-[#0F2035] mb-2">Verifikasi Email Anda</h2>
          <p className="text-[13px] text-[#5B6D80]">
            Kami telah mengirimkan 6 digit kode ke email Anda
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full px-5 pb-6">
          <div className="bg-white rounded-[26px] p-6 sm:p-8 shadow-[0_18px_45px_rgba(115,152,181,0.10)] border border-gray-100 flex flex-col items-center">
            
            <p className="text-center text-[12.5px] text-[#607C97] leading-relaxed mb-8 px-2">
              Silakan masukkan kode verifikasi yang dikirim ke kotak masuk Anda untuk melanjutkan pendaftaran.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-2 sm:gap-3 mb-8 w-full">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="w-11 h-[52px] sm:w-[50px] sm:h-[56px] rounded-[14px] bg-[#EAF4FB] text-center text-[18px] font-bold text-[#0A76CA] outline-none focus:ring-2 focus:ring-[#0A76CA]/40 transition-all border-none"
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#0E7BD3] hover:bg-[#0c6bb8] text-white font-bold py-4 px-4 rounded-[14px] transition-colors duration-200 shadow-[0_14px_24px_rgba(14,123,211,0.25)] text-center text-[15px]"
              >
                Verifikasi Akun
              </button>

              {/* Resend Section */}
              <div className="mt-7 flex flex-col items-center space-y-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`text-[13px] font-bold transition-colors ${
                    canResend ? 'text-[#0A76CA] hover:underline cursor-pointer' : 'text-[#8B9DB0] cursor-not-allowed'
                  }`}
                >
                  Kirim Ulang OTP
                </button>
                <span className="text-[10px] text-[#8B9DB0] uppercase tracking-[0.05em] font-semibold">
                  TERSEDIA DALAM {formatTime(timer)}
                </span>
              </div>
            </form>

          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-4 text-center text-[13px] text-[#5B6D80] pb-8">
          Salah memasukkan email?{' '}
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('masuk')}
            className="font-bold text-[#0A76CA] hover:underline"
          >
            Ubah Email
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifikasiOtp;
