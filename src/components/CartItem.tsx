import { Plus, Minus, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { NumberRoller } from './NumberRoller';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleMinus = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handlePlus = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-card transition-all duration-300 hover:shadow-cardHover animate-fade-in">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h4 className="font-serif font-semibold text-coffee-800 text-base truncate">
            {product.name}
          </h4>
          <p className="text-coffee-500 text-sm line-clamp-1">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-coffee-700 font-bold text-lg">¥</span>
            <NumberRoller
              value={product.price * quantity}
              className="text-coffee-700 font-bold text-lg"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinus}
              className="w-8 h-8 rounded-full bg-cream-200 text-coffee-600 flex items-center justify-center transition-all duration-200 hover:bg-cream-300 hover:scale-110 active:scale-95"
            >
              <Minus size={16} />
            </button>
            <span className="w-7 text-center font-semibold text-coffee-800">
              <NumberRoller value={quantity} />
            </span>
            <button
              onClick={handlePlus}
              className="w-8 h-8 rounded-full bg-coffee-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-coffee-700 hover:scale-110 active:scale-95"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={handleRemove}
              className="w-8 h-8 rounded-full text-coffee-400 flex items-center justify-center transition-all duration-200 hover:text-red-500 hover:bg-red-50 hover:scale-110 active:scale-95 ml-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
