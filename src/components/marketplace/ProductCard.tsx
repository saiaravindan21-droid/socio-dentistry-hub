
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product & { 
    isOnSale?: boolean;
    salePercentage?: number;
  };
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calculate sale price if product is on sale
  const salePrice = product.isOnSale && product.salePercentage 
    ? product.price * (1 - product.salePercentage / 100)
    : null;

  return (
    <Card 
      className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer" 
      onClick={onClick}
    >
      <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 text-amber-500 rounded-full px-2 py-1 text-xs font-medium">
          <Star className="h-3 w-3 fill-amber-500" />
          {product.rating}
        </div>
        
        {product.isOnSale && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            {product.salePercentage}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="flex-grow p-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.brand}</div>
        <h3 className="font-medium line-clamp-1 mb-1">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          {salePrice ? (
            <>
              <p className="text-lg font-semibold text-destructive">${salePrice.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          variant="outline"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
