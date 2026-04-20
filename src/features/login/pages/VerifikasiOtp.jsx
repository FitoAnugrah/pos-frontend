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
    <div className="min-h-screen w-full bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full mb-6 flex items-center space-x-4">
          <button type="button" onClick={() => onNavigate && onNavigate('masuk')} className="p-1 -ml-1 text-slate-600 hover:text-slate-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">POS A'i</h1>
        </div>

        {/* Top Info Section */}
        <div className="flex flex-col items-center mt-2 mb-8 text-center w-full">
          {/* Email Check Icon Box */}
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-blue-700/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="18" height="13" rx="1.5" fill="white" />
              <path d="M2.5 4.5L10 10.5C10.6 11 11.4 11 12 10.5L19.5 4.5" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="miter" />
              <path d="M10 15L14 19L22 9" stroke="#2563eb" strokeWidth="6" strokeLinejoin="miter" strokeLinecap="butt" />
              <path d="M10 15L14 19L22 9" stroke="white" strokeWidth="3" strokeLinejoin="miter" strokeLinecap="butt" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-2">Verifikasi Email Anda</h2>
          <p className="text-sm font-medium text-slate-500">
            Kami telah mengirimkan 6 digit kode ke email Anda
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center relative z-10 block">
            
            <p className="text-center text-sm text-slate-500 leading-relaxed mb-8 px-2 font-medium">
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
                    className="w-11 h-12 sm:w-12 sm:h-14 rounded-xl bg-slate-50 text-center text-lg font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all border border-slate-200"
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md text-center text-sm"
              >
                Verifikasi Akun
              </button>

              {/* Resend Section */}
              <div className="mt-7 flex flex-col items-center space-y-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`text-sm font-bold transition-colors ${
                    canResend ? 'text-blue-600 hover:underline cursor-pointer' : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Kirim Ulang OTP
                </button>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center">
                  TERSEDIA DALAM {formatTime(timer)}
                </span>
              </div>
            </form>

          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Salah memasukkan email?{' '}
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('masuk')}
            className="font-bold text-blue-600 hover:underline"
          >
            Ubah Email
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifikasiOtp;
