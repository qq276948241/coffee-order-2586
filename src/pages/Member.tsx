import { useState } from 'react';
import { Crown, Gift, Clock, ChevronRight, Ticket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { NumberRoller } from '../components/NumberRoller';

export function Member() {
  const { user, coupons, getAvailableCoupons, getUsedCoupons } = useUserStore();
  const [activeTab, setActiveTab] = useState<'available' | 'used'>('available');
  const navigate = useNavigate();
  
  const availableCoupons = getAvailableCoupons();
  const usedCoupons = getUsedCoupons();
  const displayCoupons = activeTab === 'available' ? availableCoupons : usedCoupons;

  const levelConfig = {
    bronze: { name: '青铜会员', color: 'from-amber-700 to-amber-900', icon: '🥉' },
    silver: { name: '白银会员', color: 'from-gray-400 to-gray-600', icon: '🥈' },
    gold: { name: '黄金会员', color: 'from-yellow-500 to-amber-600', icon: '🥇' },
  };

  const levelInfo = levelConfig[user.level];

  const menuItems = [
    { icon: Ticket, label: '我的订单', badge: '' },
    { icon: Gift, label: '积分商城', badge: '' },
    { icon: Clock, label: '消费记录', badge: '' },
    { icon: Sparkles, label: '专属福利', badge: '新' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 pb-28">
      <div className={`bg-gradient-to-br ${levelInfo.color} pt-8 pb-16 px-4`}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl border-2 border-white/30">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{levelInfo.icon}</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-white font-serif text-xl font-bold">{user.nickname}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Crown size={14} className="text-yellow-300" />
                <span className="text-white/90 text-sm">{levelInfo.name}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="text-white/80 text-sm flex items-center gap-1 hover:text-white transition-colors"
            >
              编辑
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm mb-1">我的积分</p>
                <div className="flex items-baseline gap-1">
                  <NumberRoller
                    value={user.points}
                    className="text-white text-3xl font-bold"
                  />
                  <span className="text-white/70 text-sm">分</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/events')}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                去赚积分
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-around">
              <div className="text-center">
                <p className="text-white font-bold text-lg">{availableCoupons.length}</p>
                <p className="text-white/70 text-xs">可用优惠券</p>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <p className="text-white font-bold text-lg">12</p>
                <p className="text-white/70 text-xs">已完成订单</p>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <p className="text-white font-bold text-lg">3</p>
                <p className="text-white/70 text-xs">收藏商品</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-coffee-800 text-lg">
              我的优惠券
            </h3>
            <div className="flex bg-cream-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('available')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'available'
                    ? 'bg-coffee-600 text-white'
                    : 'text-coffee-500 hover:text-coffee-700'
                }`}
              >
                可使用
              </button>
              <button
                onClick={() => setActiveTab('used')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'used'
                    ? 'bg-coffee-600 text-white'
                    : 'text-coffee-500 hover:text-coffee-700'
                }`}
              >
                已使用
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {displayCoupons.length === 0 ? (
              <div className="py-8 text-center text-coffee-400">
                <Ticket size={40} className="mx-auto mb-2 opacity-50" />
                <p>暂无{activeTab === 'available' ? '可用' : '已使用'}优惠券</p>
              </div>
            ) : (
              displayCoupons.map((coupon, index) => (
                <div
                  key={coupon.id}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-md animate-slide-up ${
                    coupon.used
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-coffee-200 bg-gradient-to-r from-coffee-50 to-cream-100'
                  }`}
                >
                  <div className="flex">
                    <div className="w-24 py-4 flex flex-col items-center justify-center border-r-2 border-dashed border-coffee-200">
                      {coupon.type === 'cash' ? (
                        <>
                          <div className="flex items-baseline">
                            <span className="text-coffee-600 font-bold text-lg">¥</span>
                            <span className="text-coffee-700 font-bold text-3xl">{coupon.value}</span>
                          </div>
                          <span className="text-coffee-500 text-xs">满减券</span>
                        </>
                      ) : (
                        <>
                          <span className="text-coffee-700 font-bold text-3xl">
                            {(coupon.value * 10).toFixed(0)}
                          </span>
                          <span className="text-coffee-500 text-xs">折优惠</span>
                        </>
                      )}
                    </div>
                    <div className="flex-1 px-4 py-3 flex flex-col justify-center">
                      <h4 className="font-semibold text-coffee-800">{coupon.name}</h4>
                      <p className="text-coffee-500 text-xs mt-1">
                        有效期至 {coupon.expireDate}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cream-50" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cream-50" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
          <h3 className="font-serif font-bold text-coffee-800 text-lg mb-3">
            会员功能
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                style={{ animationDelay: `${index * 0.05}s` }}
                className="flex flex-col items-center gap-2 py-3 rounded-xl transition-all duration-300 hover:bg-cream-100 hover:scale-105 animate-slide-up"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-coffee-50 flex items-center justify-center text-coffee-600">
                    <item.icon size={22} />
                  </div>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-coffee-700 text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
