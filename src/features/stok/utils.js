export function formatCurrency(value) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

export function calculateMargin(price, capitalPrice) {
  return price - capitalPrice
}

export function calculateMarginYield(price, capitalPrice) {
  if (capitalPrice <= 0) return '0%'
  const margin = calculateMargin(price, capitalPrice)
  return `${Math.round((margin / capitalPrice) * 100)}%`
}

export function getStockInfo(stock, minStock) {
  if (stock <= minStock) {
    return {
      tone: 'alert',
      status: stock === 0 ? 'Stok Habis' : 'Perlu Restock',
      textClassName: 'text-[#d62839]',
      dotClassName: 'bg-[#ef4444]',
    }
  }

  return {
    tone: 'safe',
    status: 'Stok Aman',
    textClassName: 'text-[#347f73]',
    dotClassName: 'bg-[#2ecf8f]',
  }
}

export function clampStock(value) {
  return Math.max(value, 0)
}
