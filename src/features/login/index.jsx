import React, { useState } from 'react';
import Masuk from './pages/Masuk';
import BuatAkun from './pages/BuatAkun';
import LupaKataSandi from './pages/LupaKataSandi';
import VerifikasiOtp from './pages/VerifikasiOtp';
import KataSandiBaru from './pages/KataSandiBaru';

export default function LoginFeature({ onLoginSuccess }) {
  const [currentView, setCurrentView] = useState('masuk');
  const [flowContext, setFlowContext] = useState(''); // 'register' atau 'forgot-password'
  const [userEmail, setUserEmail] = useState(''); // Untuk diteruskan antar layar jika perlu

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleRegisterSuccess = (email) => {
    setUserEmail(email);
    setFlowContext('register');
    setCurrentView('otp');
  };

  const handleForgotPasswordSuccess = (email) => {
    setUserEmail(email);
    setFlowContext('forgot-password');
    setCurrentView('otp');
  };

  const handleOtpSuccess = () => {
    if (flowContext === 'forgot-password') {
      setCurrentView('sandi-baru');
    } else if (flowContext === 'register') {
      // Setelah OTP registrasi sukses, otomatis kembali ke layar login
      alert('Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.');
      setCurrentView('masuk');
    } else {
      setCurrentView('masuk');
    }
  };

  const handleNewPasswordSuccess = () => {
    setCurrentView('masuk');
  };

  // Render view berdasarkan state
  if (currentView === 'buat-akun') {
    return <BuatAkun onNavigate={handleNavigate} onSuccess={handleRegisterSuccess} />;
  }

  if (currentView === 'lupa-sandi') {
    return <LupaKataSandi onNavigate={handleNavigate} onSuccess={handleForgotPasswordSuccess} />;
  }

  if (currentView === 'otp') {
    return <VerifikasiOtp onNavigate={handleNavigate} onSuccess={handleOtpSuccess} />;
  }

  if (currentView === 'sandi-baru') {
    return <KataSandiBaru onNavigate={handleNavigate} onSuccess={handleNewPasswordSuccess} />;
  }

  // Default view
  return <Masuk onNavigate={handleNavigate} onLoginSuccess={onLoginSuccess} />;
}
