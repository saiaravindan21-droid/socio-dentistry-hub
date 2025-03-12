
import { Product } from '@/context/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: "Electric Toothbrush Pro",
    description: "Advanced electric toothbrush with 5 cleaning modes, pressure sensor, and smart timer. Clinically proven to improve gum health in just 2 weeks.",
    price: 89.99,
    image: "/placeholder.svg",
    category: "Toothbrushes",
    brand: "OralCare",
    rating: 4.7,
    inStock: true
  },
  {
    id: 2,
    name: "Premium Dental Floss Pack",
    description: "Waxed dental floss that slides easily between teeth to remove plaque and food particles. Pack of 3 spools.",
    price: 12.99,
    image: "/placeholder.svg",
    category: "Floss",
    brand: "DentalEssentials",
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: "Whitening Toothpaste",
    description: "Professional whitening toothpaste that removes stains and prevents new ones. Contains fluoride for cavity protection.",
    price: 8.99,
    image: "/placeholder.svg",
    category: "Toothpaste",
    brand: "BrightSmile",
    rating: 4.3,
    inStock: true
  },
  {
    id: 4,
    name: "Antibacterial Mouthwash",
    description: "Alcohol-free mouthwash that kills 99.9% of germs that cause bad breath, plaque, and gingivitis.",
    price: 7.49,
    image: "/placeholder.svg",
    category: "Mouthwash",
    brand: "FreshBreath",
    rating: 4.4,
    inStock: true
  },
  {
    id: 5,
    name: "Tongue Cleaner Deluxe",
    description: "Stainless steel tongue cleaner that removes bacteria and debris from the tongue surface, improving breath and oral health.",
    price: 14.99,
    image: "/placeholder.svg",
    category: "Accessories",
    brand: "OralCare",
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: "Sensitive Teeth Gel",
    description: "Desensitizing gel for immediate relief from tooth sensitivity. Can be used before and after dental treatments.",
    price: 19.99,
    image: "/placeholder.svg",
    category: "Treatments",
    brand: "SensitiveRelief",
    rating: 4.8,
    inStock: true
  },
  {
    id: 7,
    name: "Children's Toothbrush Set",
    description: "Set of 3 colorful toothbrushes designed for children. Soft bristles and ergonomic handles.",
    price: 15.99,
    image: "/placeholder.svg",
    category: "Toothbrushes",
    brand: "KidsDental",
    rating: 4.9,
    inStock: true
  },
  {
    id: 8,
    name: "Water Flosser Advanced",
    description: "Rechargeable water flosser with 7 pressure settings and 4 specialized tips. Removes 99.9% of plaque from treated areas.",
    price: 69.99,
    image: "/placeholder.svg",
    category: "Floss",
    brand: "AquaFloss",
    rating: 4.7,
    inStock: true
  },
  {
    id: 9,
    name: "Teeth Whitening Kit",
    description: "Complete teeth whitening system with LED light, whitening gel, and custom mouth trays. Results in just 7 days.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Treatments",
    brand: "BrightSmile",
    rating: 4.5,
    inStock: true
  },
  {
    id: 10,
    name: "Gum Massage Tool",
    description: "Silicone gum massager that stimulates blood flow and helps prevent gum disease. Antimicrobial material.",
    price: 11.99,
    image: "/placeholder.svg",
    category: "Accessories",
    brand: "GumHealth",
    rating: 4.2,
    inStock: true
  },
  {
    id: 11,
    name: "Bamboo Toothbrushes (Pack of 4)",
    description: "Eco-friendly bamboo toothbrushes with BPA-free nylon bristles. Biodegradable handles.",
    price: 16.99,
    image: "/placeholder.svg",
    category: "Toothbrushes",
    brand: "EcoDental",
    rating: 4.6,
    inStock: true
  },
  {
    id: 12,
    name: "Fluoride-Free Natural Toothpaste",
    description: "Natural toothpaste made with pure plant and mineral ingredients. No fluoride, SLS, or artificial flavors.",
    price: 9.99,
    image: "/placeholder.svg",
    category: "Toothpaste",
    brand: "NaturalSmile",
    rating: 4.4,
    inStock: true
  }
];

export const categories = [...new Set(products.map(product => product.category))];
export const brands = [...new Set(products.map(product => product.brand))];
