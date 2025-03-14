
import React from 'react';
import { Product } from '@/context/CartContext';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  // Add a sales tag to random products (in a real app, this would come from the backend)
  const productsWithSales = products.map(product => {
    const isOnSale = product.id % 3 === 0; // Just a simple rule for demo purposes
    const salePercentage = isOnSale ? Math.floor(Math.random() * 30) + 10 : 0; // Random discount between 10-40%
    
    return {
      ...product,
      isOnSale,
      salePercentage
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsWithSales.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
