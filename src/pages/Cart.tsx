import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Coffee, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import { products } from '../data/products';
import { CartItem } from '../components/CartItem';
import { NumberRoller } from '../components/NumberRoller';

export function Cart() {
  const { items, getTotalPrice, getTotalCount, clearCart } = useCartStore();
  const { addPoints } = useUserStore();
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const totalPrice = getTotalPrice();
  const totalCount = getTotalCount();

  const cartItemsWithProduct = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: typeof products[0]; quantity: number }[];

  const handleOrder = () => {
    if (!tableNumber.trim()) {
      alert('请输入桌号');
      return;
    }
    if (items.length === 0) {
      alert('购物车是空的哦');
      return;
    }

    const pointsEarned = Math.floor(totalPrice);
    addPoints(pointsEarned);
    
    setShowSuccess(true);
    
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-40">
      <div className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-coffee-600 transition-all duration-300 hover:bg-coffee-50 hover:scale-105"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-serif text-xl font-bold text-coffee-800">
            购物车
          </h1>
          {totalCount > 0 && (
            <span className="text-coffee-500 text-sm">
              共<NumberRoller value={totalCount} className="mx-1" />件商品
            </span>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {cartItemsWithProduct.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center mb-4">
              <ShoppingCart size={40} className="text-coffee-400" />
            </div>
            <p className="text-coffee-500 mb-4">购物车空空如也</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-coffee-600 text-white rounded-full font-medium transition-all duration-300 hover:bg-coffee-700 hover:scale-105"
            >
              去逛逛
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItemsWithProduct.map((item, index) => (
              <div key={item.product.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <CartItem product={item.product} quantity={item.quantity} />
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 shadow-lg z-40">
          <div className="max-w-lg mx-auto px-4 py-4 pb-6">
            <div className="mb-4">
              <label className="text-coffee-600 text-sm font-medium mb-2 block">
                桌号
              </label>
              <div className="relative">
                <Coffee size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="请输入您的桌号"
                  className="w-full pl-11 pr-4 py-3 bg-cream-100 rounded-xl text-coffee-800 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-400 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-coffee-600">合计</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-coffee-700 font-bold text-lg">¥</span>
                <NumberRoller
                  value={totalPrice}
                  className="text-coffee-700 font-bold text-2xl"
                />
              </div>
            </div>
            
            <button
              onClick={handleOrder}
              disabled={items.length === 0}
              className="w-full py-4 bg-coffee-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-coffee-800 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              确认下单
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 mx-6 flex flex-col items-center animate-bounce-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check size={40} className="text-green-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-coffee-800 mb-2">
              下单成功！
            </h3>
            <p className="text-coffee-500 text-center mb-2">
              桌号 {tableNumber} 的咖啡正在制作中
            </p>
            <p className="text-coffee-400 text-sm">
              获得 <span className="text-coffee-600 font-medium">{Math.floor(totalPrice)}</span> 积分
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
