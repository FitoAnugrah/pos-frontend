/**
 * memberStorage.js
 * ───────────────────────────────────────────────────────────────────────────────
 * Utilitas CRUD untuk data Member menggunakan localStorage.
 * Menggantikan import langsung dari JSON / augmentedMemberData.js
 * yang menyebabkan mutasi data dan inkonsistensi.
 *
 * Semua operasi menggunakan deep-copy (JSON.parse/stringify)
 * untuk menjaga prinsip immutability.
 * ───────────────────────────────────────────────────────────────────────────────
 */

import seedData from '../mock/memberData.json';

const STORAGE_KEY = 'pos_members';

// ── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];

/** Generate deterministic (but varied) transactions for a member based on member id */
function generateTransactions(member) {
  const transactions = [];
  const seed = member.id || 1;
  const numTx = ((seed * 7 + 3) % 12) + 5; // 5–16 transactions, deterministic
  let memberPts = 0;
  let currentDate = new Date();

  for (let i = 0; i < numTx; i++) {
    // Pseudo-random using a simple hash of seed + i (deterministic, no Math.random)
    const hash = ((seed * 31 + i * 17 + 7) * 2654435761) >>> 0;
    const rawAmt = ((hash % 50) * 5000) + 50000;
    const statusNum = hash % 10;
    const status = statusNum >= 3 ? 'SUCCESS' : statusNum >= 1 ? 'FAILED' : 'REFUNDED';
    const pts = status === 'SUCCESS' ? Math.floor(rawAmt / 1000) : 0;
    memberPts += pts;

    const subtotal = Math.floor(rawAmt / 1.06);
    const tax = Math.floor(subtotal * 0.11);
    const discount = Math.floor(subtotal * 0.05);

    // Move date backward deterministically
    const dayOffset = ((hash >> 8) % 14) + 1;
    currentDate = new Date(currentDate.getTime() - dayOffset * 86400000);
    const isoDate = currentDate.toISOString().split('T')[0];
    const displayDate = `${currentDate.getDate()} ${MONTH_SHORT[currentDate.getMonth()]}`;
    const timeHours = String(((hash >> 4) % 12) + 9).padStart(2, '0');
    const timeMins = String((hash >> 12) % 60).padStart(2, '0');

    const paymentMethod = (hash >> 16) % 2 === 0 ? 'Cash' : 'QRIS';
    const dateStrForId = isoDate.replace(/-/g, '');
    const idSeq = String(((hash >> 20) % 900) + 100);

    transactions.push({
      id: `INV/${dateStrForId}/${idSeq}`,
      trxId: `TRX-${String(((hash >> 5) % 900000) + 100000)}`,
      isoDate,
      displayDate,
      time: `${timeHours}:${timeMins}`,
      amount: `Rp ${rawAmt.toLocaleString('id-ID')}`,
      status,
      paymentMethod,
      cashier: ['Admin Ali', 'Anisa Rahma', 'Budi Kasir'][(hash >> 3) % 3],
      items: [
        { name: 'Minyak Goreng 1L', price: 'Rp 25.000', qty: 2, total: 'Rp 50.000' },
        { name: 'Beras Premium 5kg', price: 'Rp 95.000', qty: 1, total: 'Rp 95.000' },
        { name: 'Gula Pasir 1kg', price: 'Rp 15.000', qty: 1, total: 'Rp 15.000' },
      ],
      points: { earned: `+${pts}`, balance: `${memberPts} pts` },
      summary: {
        subtotal: `Rp ${subtotal.toLocaleString('id-ID')}`,
        tax: `Rp ${tax.toLocaleString('id-ID')}`,
        discount: `-Rp ${discount.toLocaleString('id-ID')}`,
      },
      payment: { method: paymentMethod, change: 'Rp 0' },
    });
  }
  return { transactions, totalPoints: memberPts };
}

/** Augment a raw member with initials, fixed joinedDate, and transactions */
function augmentMember(m) {
  const member = { ...m };

  // Fix joinedDate format YYYY-MM-DD → "Bulan Tahun"
  if (member.joinedDate && member.joinedDate.includes('-')) {
    const parts = member.joinedDate.split('-');
    if (parts.length === 3) {
      member.joinedDate = `${MONTH_NAMES[parseInt(parts[1]) - 1]} ${parts[0]}`;
    }
  }

  // Generate initials
  if (!member.initials) {
    member.initials = member.name
      ? member.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
      : '??';
  }

  // Generate transactions if not present
  if (!member.transactions || member.transactions.length === 0) {
    const { transactions, totalPoints } = generateTransactions(member);
    member.transactions = transactions;
    member.points = totalPoints.toLocaleString('id-ID');
  }

  return member;
}

// ── CRUD Functions ───────────────────────────────────────────────────────────

/**
 * Initialize localStorage with seed data if empty, then return all members.
 * Always returns a fresh deep-copy.
 */
export function getMembers() {
  let raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    // First load: augment seed data and store
    const augmented = seedData.map(m => augmentMember(m));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(augmented));
    return augmented;
  }

  return JSON.parse(raw);
}

/**
 * Find a single member by numeric id. Returns deep-copy or null.
 */
export function getMemberById(id) {
  const members = getMembers();
  const found = members.find(m => m.id === parseInt(id));
  return found ? { ...found } : null;
}

/**
 * Add a new member. Returns the saved member object.
 */
export function saveMember(newMember) {
  const members = getMembers();

  // Ensure unique id
  const member = augmentMember({
    ...newMember,
    id: newMember.id || Date.now(),
    memberId: newMember.memberId || `MEMBER-${String(Date.now()).slice(-5)}`,
    points: newMember.points ?? 0,
    status: newMember.status || 'Active Account',
    transactions: newMember.transactions || [],
  });

  members.push(member);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return member;
}

/**
 * Update an existing member by id. Merges fields immutably.
 */
export function updateMember(id, updates) {
  const members = getMembers();
  const index = members.findIndex(m => m.id === parseInt(id));
  if (index === -1) return null;

  members[index] = { ...members[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return members[index];
}

/**
 * Delete a member by id. Returns true if deleted.
 */
export function deleteMember(id) {
  const members = getMembers();
  const filtered = members.filter(m => m.id !== parseInt(id));
  if (filtered.length === members.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Reset storage to seed data (useful for dev/testing).
 */
export function resetMembers() {
  localStorage.removeItem(STORAGE_KEY);
  return getMembers();
}
