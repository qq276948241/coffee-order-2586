import { useState } from 'react';
import {
  User,
  Phone,
  Settings,
  Heart,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  ArrowLeft,
  MapPin,
  Bell,
  Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

export function Profile() {
  const { user, updateUser } = useUserStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = () => {
    updateUser({ nickname, phone });
    setIsEditing(false);
  };

  const menuItems = [
    { icon: MapPin, label: '收货地址', badge: '' },
    { icon: Heart, label: '我的收藏', badge: '3' },
    { icon: Bell, label: '消息通知', badge: '' },
    { icon: Shield, label: '账号安全', badge: '' },
    { icon: HelpCircle, label: '帮助中心', badge: '' },
    { icon: Settings, label: '设置', badge: '' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 pb-28">
      <div className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-coffee-600 transition-all duration-300 hover:bg-coffee-50 hover:scale-105"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-serif text-xl font-bold text-coffee-800 flex-1">
            个人资料
          </h1>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-coffee-600 font-medium text-sm hover:text-coffee-700 transition-colors"
            >
              保存
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-coffee-600 font-medium text-sm hover:text-coffee-700 transition-colors"
            >
              编辑
            </button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-coffee-200 to-coffee-300 flex items-center justify-center text-4xl border-4 border-white shadow-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="头像"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-white" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-coffee-600 text-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-coffee-700 hover:scale-110">
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-coffee-500 text-sm mb-2 block">昵称</label>
              {isEditing ? (
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-cream-100 rounded-xl text-coffee-800 focus:outline-none focus:ring-2 focus:ring-coffee-400 transition-all"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 px-4 bg-cream-50 rounded-xl">
                  <User size={18} className="text-coffee-400" />
                  <span className="text-coffee-700 font-medium">{user.nickname}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-coffee-500 text-sm mb-2 block">手机号</label>
              {isEditing ? (
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-cream-100 rounded-xl text-coffee-800 focus:outline-none focus:ring-2 focus:ring-coffee-400 transition-all"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 px-4 bg-cream-50 rounded-xl">
                  <Phone size={18} className="text-coffee-400" />
                  <span className="text-coffee-700 font-medium">{user.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-coffee-500 text-sm mb-2 block">会员等级</label>
              <div className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                <span className="text-2xl">🥇</span>
                <div>
                  <p className="text-coffee-800 font-medium">黄金会员</p>
                  <p className="text-coffee-500 text-xs">积分 {user.points} / 5000 升级</p>
                </div>
                <div className="ml-auto">
                  <ChevronRight size={18} className="text-coffee-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="w-full flex items-center gap-4 px-5 py-4 border-b border-cream-100 last:border-b-0 transition-all duration-300 hover:bg-cream-50 animate-slide-up"
            >
              <div className="w-9 h-9 rounded-full bg-coffee-50 flex items-center justify-center text-coffee-600">
                <item.icon size={18} />
              </div>
              <span className="text-coffee-700 font-medium flex-1 text-left">
                {item.label}
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-coffee-100 text-coffee-600 text-xs rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={18} className="text-coffee-400" />
            </button>
          ))}
        </div>

        <button className="w-full mt-6 py-4 bg-white text-red-500 rounded-2xl shadow-card font-medium transition-all duration-300 hover:bg-red-50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
          <LogOut size={18} />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
}
