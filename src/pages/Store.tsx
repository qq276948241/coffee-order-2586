import { MapPin, Phone, Clock, Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storeInfo } from '../data/store';

export function Store() {
  const navigate = useNavigate();

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
          <h1 className="font-serif text-xl font-bold text-coffee-800">
            门店导航
          </h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-6">
          <div className="relative h-56 bg-gradient-to-br from-coffee-200 via-coffee-100 to-cream-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                  <MapPin size={28} className="text-coffee-600" />
                </div>
                <p className="text-coffee-700 font-medium">{storeInfo.name}</p>
              </div>
            </div>
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path d="M0,100 Q50,80 100,100 T200,100 T300,100 T400,100" stroke="#8B6345" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <path d="M50,50 Q100,30 150,50 T250,50 T350,50" stroke="#A67B5B" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
                <path d="M20,150 Q80,130 140,150 T260,150 T380,150" stroke="#A67B5B" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
                <circle cx="200" cy="100" r="8" fill="#6F4E37" />
                <circle cx="200" cy="100" r="16" fill="#6F4E37" opacity="0.3" />
                <circle cx="200" cy="100" r="24" fill="#6F4E37" opacity="0.15" />
              </svg>
            </div>
          </div>
          
          <div className="p-5">
            <h2 className="font-serif text-xl font-bold text-coffee-800 mb-4">
              {storeInfo.name}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-coffee-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-coffee-600" />
                </div>
                <div>
                  <p className="text-coffee-700 font-medium">地址</p>
                  <p className="text-coffee-500 text-sm">{storeInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-coffee-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-coffee-600" />
                </div>
                <div>
                  <p className="text-coffee-700 font-medium">电话</p>
                  <p className="text-coffee-500 text-sm">{storeInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-coffee-50 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-coffee-600" />
                </div>
                <div>
                  <p className="text-coffee-700 font-medium">营业时间</p>
                  <p className="text-coffee-500 text-sm">{storeInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 bg-coffee-600 text-white rounded-xl font-medium transition-all duration-300 hover:bg-coffee-700 hover:scale-[1.02] active:scale-[0.98] shadow-md">
            <Navigation size={18} />
            <span>导航前往</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-4 bg-white text-coffee-700 rounded-xl font-medium shadow-card transition-all duration-300 hover:bg-cream-50 hover:scale-[1.02] active:scale-[0.98]">
            <Phone size={18} />
            <span>拨打电话</span>
          </button>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-card p-5">
          <h3 className="font-serif font-bold text-coffee-800 text-lg mb-4">
            门店特色
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '☕', label: '精品咖啡' },
              { icon: '🍰', label: '手工甜点' },
              { icon: '📚', label: '阅读空间' },
              { icon: '🎵', label: '轻音乐' },
              { icon: '🌿', label: '绿植环绕' },
              { icon: '💻', label: '免费WiFi' },
            ].map((item, index) => (
              <div
                key={item.label}
                style={{ animationDelay: `${index * 0.05}s` }}
                className="flex flex-col items-center gap-2 py-4 bg-cream-50 rounded-xl animate-slide-up"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-coffee-600 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
