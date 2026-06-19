import { useState } from 'react';
import { ShoppingCart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { NumberRoller } from '../components/NumberRoller';
import { useCartStore } from '../store/useCartStore';
import { Category } from '../types';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>('latte');
  const { getTotalCount, getTotalPrice } = useCartStore();
  const navigate = useNavigate();
  
  const cartCount = getTotalCount();
  const cartPrice = getTotalPrice();

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-cream-50 pb-28">
      <div className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200">
        <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-serif text-2xl font-bold text-coffee-800">
                慢时光咖啡
              </h1>
              <div className="flex items-center gap-1 text-coffee-500 text-sm mt-1">
                <MapPin size={14} />
                <span>文化路店</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/store')}
              className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-coffee-600 transition-all duration-300 hover:bg-coffee-50 hover:scale-105"
            >
              <MapPin size={20} />
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as Category)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-coffee-700 text-white shadow-md scale-105'
                    : 'bg-white text-coffee-600 hover:bg-cream-100 shadow-card'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-slide-up"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4">
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-coffee-700 text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-xl transition-all duration-300 hover:bg-coffee-800 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] bg-coffee-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  <NumberRoller value={cartCount} />
                </span>
              </div>
              <span className="font-medium">去结算</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm">¥</span>
              <NumberRoller value={cartPrice} className="text-xl font-bold" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
