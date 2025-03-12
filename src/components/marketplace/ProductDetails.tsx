
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product, useCart } from '@/context/CartContext';
import { ShoppingCart, Star, Minus, Plus, CheckCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentForm from '@/components/common/PaymentForm';

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
      action: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
      ),
    });
    onClose();
  };

  const handleBuyNow = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Purchase Successful!",
      description: `Thank you for purchasing ${product.name}.`,
    });
    setIsPaymentOpen(false);
    onClose();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        {!isPaymentOpen ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-6 flex flex-col">
              <DialogHeader>
                <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">{product.brand}</div>
                <DialogTitle className="text-xl font-semibold mb-2">{product.name}</DialogTitle>
                <div className="flex items-center gap-1 mb-4">
                  <div className="bg-amber-100 text-amber-800 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 fill-amber-500 mr-1" />
                    {product.rating} rating
                  </div>
                  <div className="text-sm text-muted-foreground">• {product.category}</div>
                </div>
              </DialogHeader>
              
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-9 w-9 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-12 h-9 text-center border-0 rounded-none focus-visible:ring-0"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={increaseQuantity}
                    className="h-9 w-9 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleBuyNow}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => setIsPaymentOpen(false)}
            >
              ← Back to Product
            </Button>
            <PaymentForm 
              amount={product.price * quantity}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setIsPaymentOpen(false)}
              serviceName={product.name}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
