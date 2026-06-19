import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Gift } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { NumberRoller } from './NumberRoller';

export function CheckInCalendar() {
  const {
    checkIn,
    doCheckIn,
    canCheckInToday,
    getCheckInRecordsByMonth,
  } = useUserStore();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const canCheckIn = canCheckInToday();
  const monthlyRecords = getCheckInRecordsByMonth(currentYear, currentMonth);
  const checkInMap = useMemo(() => {
    const map = new Map<number, number>();
    monthlyRecords.forEach((r) => {
      const day = parseInt(r.date.split('-')[2], 10);
      map.set(day, r.pointsEarned);
    });
    return map;
  }, [monthlyRecords]);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const firstDay = new Date(currentYear, currentMonth - 1, 1);
  const lastDay = new Date(currentYear, currentMonth, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstWeekDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isCurrentMonth =
    currentYear === today.getFullYear() && currentMonth === today.getMonth() + 1;

  const handleCheckIn = () => {
    const result = doCheckIn();
    if (result.success) {
      setSuccessMsg(result.message);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      setSuccessMsg(result.message);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  };

  const daysUntilBonus = 7 - (checkIn.consecutiveDays % 7);

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon size={20} className="text-coffee-600" />
          <h3 className="font-serif font-bold text-coffee-800 text-lg">
            每日签到
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-coffee-50 px-3 py-1 rounded-full">
          <Sparkles size={14} className="text-coffee-500" />
          <span className="text-coffee-600 text-sm font-medium">
            连续 <NumberRoller value={checkIn.consecutiveDays} className="text-coffee-700 font-bold mx-1" /> 天
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-coffee-50 to-amber-50 rounded-xl p-4 mb-4 border border-coffee-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-coffee-700 font-medium mb-1">
              每日签到 +5 积分
            </p>
            <p className="text-coffee-500 text-sm flex items-center gap-1">
              <Gift size={14} />
              {daysUntilBonus === 0
                ? '今日签到翻倍奖励已达成！'
                : `再签 ${daysUntilBonus} 天可享翻倍奖励`}
            </p>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={!canCheckIn}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              canCheckIn
                ? 'bg-coffee-600 text-white hover:bg-coffee-700 hover:scale-105 active:scale-95 shadow-md'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canCheckIn ? '立即签到' : '已签到'}
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-coffee-100">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isCompleted = checkIn.consecutiveDays >= day || (!canCheckIn && checkIn.consecutiveDays >= day - 1);
            const isToday = !canCheckIn && checkIn.consecutiveDays === day - 1 + Math.floor(checkIn.consecutiveDays / 7) * 7;
            const displayDay = ((checkIn.consecutiveDays - 1) % 7) + 1 >= day || (!canCheckIn && ((checkIn.consecutiveDays) % 7) >= day) || checkIn.consecutiveDays >= 7;
            return (
              <div key={day} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    displayDay || day <= ((checkIn.consecutiveDays - 1) % 7) + 1
                      ? 'bg-coffee-600 text-white shadow-md'
                      : day === (((checkIn.consecutiveDays) % 7) + 1) && canCheckIn
                      ? 'bg-coffee-100 text-coffee-600 ring-2 ring-coffee-400 ring-offset-1'
                      : 'bg-cream-100 text-coffee-400'
                  } ${day === 7 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : ''}`}
                >
                  {day === 7 ? (
                    <span className="text-sm">✦</span>
                  ) : (
                    day
                  )}
                </div>
                <span className={`mt-1 text-xs ${
                  day === 7 ? 'text-amber-600 font-medium' : 'text-coffee-400'
                }`}>
                  {day === 7 ? '翻倍' : day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center text-coffee-500 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <h4 className="font-medium text-coffee-700">
          {currentYear} 年 {currentMonth} 月
        </h4>
        <button
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center text-coffee-500 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs text-coffee-400 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-9" />;
          }

          const hasCheckedIn = checkInMap.has(day);
          const points = checkInMap.get(day) || 0;
          const isToday = isCurrentMonth && day === today.getDate();
          const isBonus = hasCheckedIn && points > 5;

          return (
            <div
              key={index}
              className={`h-9 rounded-lg flex flex-col items-center justify-center text-sm relative transition-all duration-200 ${
                hasCheckedIn
                  ? isBonus
                    ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200'
                    : 'bg-coffee-100 border border-coffee-200'
                  : isToday
                  ? 'bg-cream-50 ring-2 ring-coffee-400 ring-offset-1'
                  : 'hover:bg-cream-50'
              }`}
            >
              <span
                className={`${
                  hasCheckedIn
                    ? isBonus
                      ? 'text-amber-700 font-semibold'
                      : 'text-coffee-700 font-semibold'
                    : isToday
                    ? 'text-coffee-700 font-medium'
                    : 'text-coffee-500'
                }`}
              >
                {day}
              </span>
              {hasCheckedIn && (
                <span
                  className={`absolute -bottom-0.5 text-[8px] leading-none ${
                    isBonus ? 'text-amber-600' : 'text-coffee-500'
                  }`}
                >
                  +{points}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-cream-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-coffee-100 border border-coffee-200" />
          <span className="text-xs text-coffee-500">已签到 +5</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200" />
          <span className="text-xs text-coffee-500">翻倍 +10</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-cream-50 ring-1 ring-coffee-400" />
          <span className="text-xs text-coffee-500">今天</span>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-coffee-700 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-300" />
            <span className="font-medium">{successMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
