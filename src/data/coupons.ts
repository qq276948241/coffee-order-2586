import { Coupon } from '../types';

export const coupons: Coupon[] = [
  {
    id: 'coupon-1',
    name: '新用户专享券',
    type: 'cash',
    value: 10,
    expireDate: '2026-12-31',
    used: false,
  },
  {
    id: 'coupon-2',
    name: '首单立减券',
    type: 'discount',
    value: 0.85,
    expireDate: '2026-07-31',
    used: false,
  },
  {
    id: 'coupon-3',
    name: '会员日特惠券',
    type: 'cash',
    value: 15,
    expireDate: '2026-06-25',
    used: false,
  },
  {
    id: 'coupon-4',
    name: '生日专属券',
    type: 'discount',
    value: 0.7,
    expireDate: '2026-08-15',
    used: false,
  },
  {
    id: 'coupon-5',
    name: '邀请好友券',
    type: 'cash',
    value: 20,
    expireDate: '2026-05-30',
    used: true,
  },
  {
    id: 'coupon-6',
    name: '周年庆券',
    type: 'discount',
    value: 0.8,
    expireDate: '2026-04-20',
    used: true,
  },
];
