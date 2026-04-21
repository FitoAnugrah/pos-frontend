import rawMembersData from './memberData.json';

const membersData = [...rawMembersData];

if (!membersData.__augmentedV4) {
  membersData.__augmentedV4 = true;
  membersData.forEach((m) => {
    // Fix existing joinedDates that might have been YYYY-MM-DD
    if (m.joinedDate && m.joinedDate.includes('-')) {
       const parts = m.joinedDate.split('-');
       if(parts.length === 3) {
         const mNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
         m.joinedDate = `${mNames[parseInt(parts[1])-1]} ${parts[0]}`;
       }
    }

    m.transactions = [];
    const numTx = Math.floor(Math.random() * 12) + 5;
    let memberPts = 0;
    
    // Generate dates backwards from today
    let currentDate = new Date();
    
    for (let i = 0; i < numTx; i++) {
      const rawAmt = Math.floor(Math.random() * 50) * 5000 + 50000;
      const statusRand = Math.random();
      const status = statusRand > 0.3 ? 'SUCCESS' : statusRand > 0.1 ? 'FAILED' : 'REFUNDED';
      const pts = status === 'SUCCESS' ? Math.floor(rawAmt / 1000) : 0;
      memberPts += pts;
      
      const subtotal = Math.floor(rawAmt / 1.06);
      const tax = Math.floor(subtotal * 0.11);
      const discount = Math.floor(subtotal * 0.05);
      
      // Randomize date backwards
      currentDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 14) - 1);
      const isoDate = currentDate.toISOString().split('T')[0];
      
      const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
      const displayDate = `${currentDate.getDate()} ${mNames[currentDate.getMonth()]}`;
      const timeHours = String(Math.floor(Math.random() * 12) + 9).padStart(2, '0');
      const timeMins = String(Math.floor(Math.random() * 60)).padStart(2, '0');

      const paymentMethod = ['Cash', 'QRIS'][Math.floor(Math.random() * 2)];

      const dateStrForId = isoDate.replace(/-/g, '');
      const idSeq = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');

      m.transactions.push({
        id: `INV/${dateStrForId}/${idSeq}`,
        trxId: `TRX-${Math.floor(Math.random() * 900000) + 100000}`,
        isoDate: isoDate,
        displayDate: displayDate,
        time: `${timeHours}:${timeMins}`,
        amount: `Rp ${rawAmt.toLocaleString('id-ID')}`,
        status: status,
        paymentMethod: paymentMethod,
        cashier: ['Admin Ali', 'Anisa Rahma', 'Budi Kasir'][Math.floor(Math.random() * 3)],
        items: [
           { name: 'Minyak Goreng 1L', price: 'Rp 25.000', qty: 2, total: 'Rp 50.000' },
           { name: 'Beras Premium 5kg', price: 'Rp 95.000', qty: 1, total: 'Rp 95.000' },
           { name: 'Gula Pasir 1kg', price: 'Rp 15.000', qty: 1, total: 'Rp 15.000' }
        ],
        points: { earned: `+${pts}`, balance: `${memberPts} pts` },
        summary: {
          subtotal: `Rp ${subtotal.toLocaleString('id-ID')}`,
          tax: `Rp ${tax.toLocaleString('id-ID')}`,
          discount: `-Rp ${discount.toLocaleString('id-ID')}`
        },
        payment: {
          method: paymentMethod,
          change: 'Rp 0'
        }
      });
    }
    m.points = memberPts.toLocaleString('id-ID');
  });
}

export default membersData;
