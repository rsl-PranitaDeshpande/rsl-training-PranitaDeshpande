import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Ergonomic Mouse",
    category: "Peripherals",
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
    status: "In Stock",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Mechanical Gaming Keyboard",
    category: "Peripherals",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    status: "Low Stock",
    isAvailable: true,
  },
  {
    id: "3",
    name: 'UltraWide Curved Monitor 34"',
    category: "Displays",
    price: 599.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
    status: "In Stock",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Noise-Canceling Headphones",
    category: "Audio",
    price: 199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    status: "Out of Stock",
    isAvailable: false,
  },
  {
    id: "5",
    name: "USB-C Docking Station",
    category: "Accessories",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1609692814858-f7cd2f0afd1f?w=500&auto=format&fit=crop&q=60",
    status: "In Stock",
    isAvailable: true,
  },
  {
    id: "6",
    name: "HD Webcam 1080p",
    category: "Video",
    price: 69.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&auto=format&fit=crop&q=60",
    status: "Low Stock",
    isAvailable: true,
  },
];
