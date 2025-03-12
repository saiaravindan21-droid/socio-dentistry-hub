
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface FiltersProps {
  categories: string[];
  brands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  sortBy: string;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  sortBy,
  searchTerm,
  onCategoryChange,
  onBrandChange,
  onSortChange,
  onSearchChange,
  onClearFilters
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm) && (
          <Button 
            variant="ghost" 
            className="h-8 px-2 text-xs" 
            onClick={onClearFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium mb-3">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox 
                id={`brand-${brand}`} 
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => onBrandChange(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium mb-3">Sort By</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {sortBy === 'name-asc' && 'Name (A-Z)'}
              {sortBy === 'name-desc' && 'Name (Z-A)'}
              {sortBy === 'price-asc' && 'Price (Low to High)'}
              {sortBy === 'price-desc' && 'Price (High to Low)'}
              {sortBy === 'rating-desc' && 'Highest Rated'}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
              <DropdownMenuRadioItem value="name-asc">Name (A-Z)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name-desc">Name (Z-A)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-asc">Price (Low to High)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-desc">Price (High to Low)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating-desc">Highest Rated</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Filters;
