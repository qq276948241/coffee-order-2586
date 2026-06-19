import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { NumberRoller } from './NumberRoller';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, getItemQuantity } = useCartStore();
  const quantity = getItemQuantity(product.id);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quantity > 0) {
      setIsAdded(true);
      const timer = setTimeout(() => setIsAdded(false), 300);
      return () => clearTimeout(timer);
    }
  }, [quantity]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.id);
  };

  const handleMinus = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handlePlus = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 group">
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          {quantity > 0 && (
            <span className="bg-coffee-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              已选
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-semibold text-coffee-800 text-lg mb-1">
          {product.name}
        </h3>
        <p className="text-coffee-500 text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-coffee-700 font-bold text-xl">¥</span>
            <NumberRoller
              value={product.price}
              className="text-coffee-700 font-bold text-xl"
            />
          </div>
          
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`w-10 h-10 rounded-full bg-coffee-600 text-white flex items-center justify-center transition-all duration-300 hover:bg-coffee-700 hover:scale-110 active:scale-95 ${
                isAdded ? 'scale-110 bg-coffee-700' : ''
              }`}
            >
              <Plus size={20} />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-cream-200 rounded-full px-2 py-1">
              <button
                onClick={handleMinus}
                className="w-7 h-7 rounded-full bg-white text-coffee-600 flex items-center justify-center transition-all duration-200 hover:bg-coffee-50 hover:scale-110 active:scale-95 shadow-sm"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center font-semibold text-coffee-800">
                <NumberRoller value={quantity} />
              </span>
              <button
                onClick={handlePlus}
                className="w-7 h-7 rounded-full bg-coffee-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-coffee-700 hover:scale-110 active:scale-95 shadow-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
