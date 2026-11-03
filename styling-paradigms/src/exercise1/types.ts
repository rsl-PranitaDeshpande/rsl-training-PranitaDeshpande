export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  isAvailable: boolean;
}
