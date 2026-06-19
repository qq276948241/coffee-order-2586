import { NavLink, useLocation } from 'react-router-dom';
import { Coffee, Calendar, Crown, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { NumberRoller } from './NumberRoller';

export function BottomNav() {
  const { getTotalCount } = useCartStore();
  const cartCount = getTotalCount();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Coffee, label: '菜单' },
    { path: '/events', icon: Calendar, label: '活动' },
    { path: '/cart', icon: ShoppingCart, label: '购物车', badge: cartCount },
    { path: '/member', icon: Crown, label: '会员' },
    { path: '/profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 shadow-lg z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 min-w-[56px] ${
                isActive
                  ? 'text-coffee-700 bg-coffee-50'
                  : 'text-coffee-400 hover:text-coffee-600 hover:bg-cream-100'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-coffee-600 text-white text-xs font-medium rounded-full flex items-center justify-center px-1">
                    <NumberRoller value={item.badge} />
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="h-safe-bottom bg-white" />
    </nav>
  );
}
