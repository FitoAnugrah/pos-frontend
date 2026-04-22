import { initialProducts } from '../mock/stokData';

const STOCK_PRODUCTS_STORAGE_KEY = 'pos-stock-products';

export function getProducts() {
  if (typeof window === 'undefined') {
    return initialProducts;
  }

  try {
    const storedProducts = window.localStorage.getItem(STOCK_PRODUCTS_STORAGE_KEY);
    if (!storedProducts) {
      return initialProducts;
    }

    const parsedProducts = JSON.parse(storedProducts);
    return Array.isArray(parsedProducts) && parsedProducts.length > 0 ? parsedProducts : initialProducts;
  } catch {
    return initialProducts;
  }
}
