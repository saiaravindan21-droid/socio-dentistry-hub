
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { CreditCard, CheckCircle2 } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  serviceName?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onSuccess, 
  onCancel,
  serviceName = 'Order'
}) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (paymentMethod === 'credit-card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast({
          title: "Incomplete payment information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      // Simple card number validation (16 digits)
      if (cardNumber.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(cardNumber.replace(/\s/g, ''))) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid 16-digit card number.",
          variant: "destructive",
        });
        return;
      }
      
      // Simple CVV validation (3-4 digits)
      if (cvv.length < 3 || !/^\d+$/.test(cvv)) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV code.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Payment Successful",
        description: `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
        action: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        ),
      });
      
      onSuccess();
    }, 2000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Complete your {serviceName.toLowerCase()} with a secure payment</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="text-xl font-bold">Total: ${amount.toFixed(2)}</div>
          
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex flex-1 justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Credit / Debit Card</span>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4 opacity-50">
              <RadioGroupItem value="paypal" id="paypal" disabled />
              <Label htmlFor="paypal" className="flex flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span>PayPal</span>
                  <span className="text-xs text-muted-foreground">(Coming soon)</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
          
          {paymentMethod === 'credit-card' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456" 
                  value={cardNumber}
                  onChange={(e) => {
                    // Format card number with spaces
                    const input = e.target.value.replace(/\s/g, '');
                    if (input.length <= 16 && /^\d*$/.test(input)) {
                      const formatted = input.match(/.{1,4}/g)?.join(' ') || input;
                      setCardNumber(formatted);
                    }
                  }}
                  maxLength={19} // 16 digits + 3 spaces
                />
              </div>
              
              <div>
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input 
                  id="card-name" 
                  placeholder="John Doe" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    value={expiryDate}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, '');
                      if (input.length <= 4) {
                        if (input.length <= 2) {
                          setExpiryDate(input);
                        } else {
                          setExpiryDate(`${input.slice(0, 2)}/${input.slice(2)}`);
                        }
                      }
                    }}
                    maxLength={5} // MM/YY format
                  />
                </div>
                
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    value={cvv}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, '');
                      if (input.length <= 4) {
                        setCvv(input);
                      }
                    }}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between gap-4">
          <Button 
            type="button"
            variant="outline" 
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;
