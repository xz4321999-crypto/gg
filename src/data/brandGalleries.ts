import { PRODUCTS, STORE_ASSETS } from './catalog';
import { CategoryId, Product } from '../types';

export interface BrandSummary {
  brand: string;
  productCount: number;
  photoCount: number;
  previewImage: string;
}

export interface BrandGalleryPhoto {
  id: string;
  index: number;
  titleTh: string;
  angleLabel: string;
  image: string;
  product: Product;
}

export function getBrandsForCategory(category: CategoryId): BrandSummary[] {
  const scoped =
    category === CategoryId.All
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  const map = new Map<string, Product[]>();
  for (const product of scoped) {
    const existing = map.get(product.brand) ?? [];
    existing.push(product);
    map.set(product.brand, existing);
  }

  return Array.from(map.entries()).map(([brand, list]) => ({
    brand,
    productCount: list.length,
    photoCount: list.length,
    previewImage: list[0]?.image ?? STORE_ASSETS.hero,
  }));
}

export function getBrandGalleryPhotos(
  brand: string,
  category: CategoryId
): BrandGalleryPhoto[] {
  // Strictly return only products belonging to both the selected brand and selected category.
  // Never mix in products or photos from other brands or unrelated categories.
  const matchingProducts = PRODUCTS.filter(
    (p) =>
      p.brand === brand &&
      (category === CategoryId.All || p.category === category)
  );

  return matchingProducts.map((product, idx) => ({
    id: `${brand}-${product.category}-${product.id}`,
    index: idx + 1,
    titleTh: product.name,
    angleLabel: `${product.brand} · ${product.categoryLabelTh}`,
    image: product.image,
    product,
  }));
}
