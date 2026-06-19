import { Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { events } from '../data/events';

export function Events() {
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
            本周活动
          </h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-coffee-600 to-coffee-700 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <SparklesIcon className="text-yellow-300" />
            <span className="font-medium">新活动上线</span>
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">夏日特调季</h2>
          <p className="text-white/80 text-sm mb-4">
            清爽一夏，多款冰饮新品上市，第二杯半价
          </p>
          <button className="bg-white text-coffee-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            立即查看
          </button>
        </div>

        <h3 className="font-serif font-bold text-coffee-800 text-lg mb-4">
          活动列表
        </h3>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              style={{ animationDelay: `${index * 0.08}s` }}
              className="bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 animate-slide-up"
            >
              <div className="relative h-44">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
                    <Calendar size={14} />
                    <span>{event.date}</span>
                  </div>
                  <h4 className="text-white font-serif text-xl font-bold">
                    {event.title}
                  </h4>
                </div>
              </div>
              <div className="p-4">
                <p className="text-coffee-600 text-sm leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-coffee-400 text-xs">
                    <Clock size={12} />
                    <span>名额有限，先到先得</span>
                  </div>
                  <button className="flex items-center gap-1 text-coffee-600 text-sm font-medium hover:text-coffee-700 transition-colors">
                    了解详情
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparklesIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}
