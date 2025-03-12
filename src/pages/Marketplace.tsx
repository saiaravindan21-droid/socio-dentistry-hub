
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ProductDetails from '@/components/marketplace/ProductDetails';
import CartDrawer from '@/components/marketplace/CartDrawer';
import Filters from '@/components/marketplace/Filters';
import { Button } from '@/components/ui/button';
import { useCart, type Product } from '@/context/CartContext';
import { products, categories, brands } from '@/data/products';
import { Badge } from '@/components/ui/badge';

const Marketplace = () => {
  const { getCartCount } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('rating-desc');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategories, selectedBrands, sortBy, searchTerm]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchTerm('');
    setSortBy('rating-desc');
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Oral Care Marketplace</h1>
          <p className="text-muted-foreground">
            Browse our collection of premium dental care products
          </p>
        </div>
        <Button 
          variant="outline" 
          className="relative"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>Cart</span>
          {getCartCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {getCartCount()}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Filters 
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            sortBy={sortBy}
            searchTerm={searchTerm}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onSortChange={setSortBy}
            onSearchChange={setSearchTerm}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        {/* Product Grid */}
        <div className="flex-grow">
          {selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <button 
                    className="ml-1 hover:text-foreground/80" 
                    onClick={() => setSearchTerm('')}
                  >
                    &times;
                  </button>
                </Badge>
              )}
              
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  Category: {category}
                  <button 
                    className="ml-1 hover:text-foreground/80" 
                    onClick={() => handleCategoryChange(category)}
                  >
                    &times;
                  </button>
                </Badge>
              ))}
              
              {selectedBrands.map(brand => (
                <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                  Brand: {brand}
                  <button 
                    className="ml-1 hover:text-foreground/80" 
                    onClick={() => handleBrandChange(brand)}
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}
          
          <ProductGrid 
            products={filteredProducts} 
            onProductClick={handleProductClick} 
          />
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetails 
        product={selectedProduct} 
        isOpen={isProductDetailsOpen} 
        onClose={() => setIsProductDetailsOpen(false)}
      />
      
      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </PageLayout>
  );
};

export default Marketplace;
