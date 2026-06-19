import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Coupon, CheckInState, CheckInRecord } from '../types';
import { coupons as initialCoupons } from '../data/coupons';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isYesterday(dateStr: string): boolean {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return formatDate(yesterday) === dateStr;
}

function isSameDay(dateStr: string): boolean {
  return formatDate(new Date()) === dateStr;
}

interface UserState {
  user: User;
  coupons: Coupon[];
  checkIn: CheckInState;
  updateUser: (data: Partial<User>) => void;
  addPoints: (points: number) => void;
  useCoupon: (couponId: string) => void;
  getAvailableCoupons: () => Coupon[];
  getUsedCoupons: () => Coupon[];
  doCheckIn: () => { success: boolean; points: number; message: string };
  canCheckInToday: () => boolean;
  getCheckInRecordsByMonth: (year: number, month: number) => CheckInRecord[];
}

const defaultUser: User = {
  id: 'user-001',
  nickname: '咖啡爱好者',
  avatar: '',
  phone: '138****8888',
  points: 2680,
  level: 'gold',
};

const defaultCheckIn: CheckInState = {
  records: [],
  consecutiveDays: 0,
  lastCheckInDate: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      coupons: initialCoupons,
      checkIn: defaultCheckIn,
      
      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: { ...state.user, ...data },
        }));
      },
      
      addPoints: (points: number) => {
        set((state) => ({
          user: {
            ...state.user,
            points: state.user.points + points,
          },
        }));
      },
      
      useCoupon: (couponId: string) => {
        set((state) => ({
          coupons: state.coupons.map((coupon) =>
            coupon.id === couponId ? { ...coupon, used: true } : coupon
          ),
        }));
      },
      
      getAvailableCoupons: () => {
        const state = get();
        return state.coupons.filter((coupon) => !coupon.used);
      },
      
      getUsedCoupons: () => {
        const state = get();
        return state.coupons.filter((coupon) => coupon.used);
      },

      doCheckIn: () => {
        const state = get();
        const todayStr = formatDate(new Date());

        if (state.checkIn.lastCheckInDate && isSameDay(state.checkIn.lastCheckInDate)) {
          return { success: false, points: 0, message: '今天已经签到过啦~' };
        }

        let newConsecutiveDays = 1;
        if (state.checkIn.lastCheckInDate && isYesterday(state.checkIn.lastCheckInDate)) {
          newConsecutiveDays = state.checkIn.consecutiveDays + 1;
        }

        const basePoints = 5;
        const isBonusDay = newConsecutiveDays > 0 && newConsecutiveDays % 7 === 0;
        const pointsEarned = isBonusDay ? basePoints * 2 : basePoints;

        const newRecord: CheckInRecord = {
          date: todayStr,
          pointsEarned,
        };

        set((s) => ({
          checkIn: {
            records: [...s.checkIn.records, newRecord],
            consecutiveDays: newConsecutiveDays,
            lastCheckInDate: todayStr,
          },
          user: {
            ...s.user,
            points: s.user.points + pointsEarned,
          },
        }));

        const bonusMsg = isBonusDay ? ' 连续7天翻倍奖励！' : '';
        return {
          success: true,
          points: pointsEarned,
          message: `签到成功！获得 ${pointsEarned} 积分${bonusMsg}`,
        };
      },

      canCheckInToday: () => {
        const state = get();
        if (!state.checkIn.lastCheckInDate) return true;
        return !isSameDay(state.checkIn.lastCheckInDate);
      },

      getCheckInRecordsByMonth: (year: number, month: number) => {
        const state = get();
        const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;
        return state.checkIn.records.filter((record) =>
          record.date.startsWith(monthPrefix)
        );
      },
    }),
    {
      name: 'coffee-user-storage',
    }
  )
);
