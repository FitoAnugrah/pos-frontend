const frame06KataSandiBaruText = {
  frameName: "Kata Sandi Baru - POS A'i",
  topBackLabel: 'Pengaturan Keamanan',
  title: 'Buat Kata Sandi Baru',
  description:
    'Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya.',
  fields: {
    kataSandiBaru: {
      label: 'Kata Sandi Baru',
      placeholder: '**********',
    },
    konfirmasiKataSandiBaru: {
      label: 'Konfirmasi Kata Sandi Baru',
      placeholder: '**********',
    },
  },
  requirementsTitle: 'Persyaratan Kata Sandi',
  requirements: [
    'Minimal 8 karakter',
    'Setidaknya satu simbol (contoh: !, #, ?)',
    'Satu huruf besar dan satu huruf kecil',
  ],
  submitLabel: 'Simpan Kata Sandi',
  backToLoginLabel: 'Kembali ke Masuk',
}

export default frame06KataSandiBaruText
