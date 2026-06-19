import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Coupon } from '../types';
import { coupons as initialCoupons } from '../data/coupons';

interface UserState {
  user: User;
  coupons: Coupon[];
  updateUser: (data: Partial<User>) => void;
  addPoints: (points: number) => void;
  useCoupon: (couponId: string) => void;
  getAvailableCoupons: () => Coupon[];
  getUsedCoupons: () => Coupon[];
}

const defaultUser: User = {
  id: 'user-001',
  nickname: '咖啡爱好者',
  avatar: '',
  phone: '138****8888',
  points: 2680,
  level: 'gold',
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      coupons: initialCoupons,
      
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
    }),
    {
      name: 'coffee-user-storage',
    }
  )
);
