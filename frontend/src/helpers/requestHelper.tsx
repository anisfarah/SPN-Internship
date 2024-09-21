export function parseProducts(productsStr: string) {
  if (!productsStr) {
    return [];
  }

  try {
    const products = JSON.parse(productsStr);

    return products.map((product: { product: string; passengersCount: string }) => ({
      product: product.product,
      passengersCount: parseInt(product.passengersCount, 10)
    }));
  } catch (error) {
    console.error('Failed to parse products, returning empty array:', error);

    return [];
  }
}
