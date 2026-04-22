const dashboardText = {
  brand: "Vault POS",
  brandSub: "KASIR POS - A'I",

  terminal: {
    badge: 'TERMINAL READY',
    cta: 'Buka Mesin Kasir / Scan',
  },

  stats: {
    omset: {
      label: 'OMSET HARI INI',
      value: 'Rp 6.250.000',
    },
    transaksi: {
      label: 'TRANSAKSI AKTIF',
      value: '12',
      sub: '3 Penjualan selesai 3 jam yang lalu',
    },
  },

  quickAccess: {
    title: 'QUICK ACCESS',
    items: [
      { id: 'member', label: 'Member' },
      { id: 'stok', label: 'Stok' },
      { id: 'laporan', label: 'Laporan' },
      { id: 'panel', label: 'Panel' },
    ],
  },

  activity: {
    title: 'AKTIVITAS TERKINI',
    seeAll: 'LIHAT SEMUA',
    items: [
      {
        id: 1,
        type: 'warning',
        title: 'Stok Minyak - 3',
        desc: 'Stok Pembaruan minyak di gudang utama',
        time: '10:00',
      },
      {
        id: 2,
        type: 'info',
        title: 'Member baru mendaftar',
        desc: 'Registrasi via Aplikasi Pelanggan',
        time: '09:45',
      },
      {
        id: 3,
        type: 'info',
        title: "Pembuatan Satuan PTKN 0001",
        desc: 'Digital Master - Rp 120.000',
        time: '09:30',
      },
    ],
  },

  bottomNav: [
    { id: 'terminal', label: 'Terminal' },
    { id: 'riwayat', label: 'Riwayat' },
    { id: 'stok', label: 'Stok' },
    { id: 'pengaturan', label: 'Pengaturan' },
  ],
}

export default dashboardText
