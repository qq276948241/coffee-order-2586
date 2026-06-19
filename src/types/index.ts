export type Category = 'latte' | 'pour-over' | 'special';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Coupon {
  id: string;
  name: string;
  type: 'discount' | 'cash';
  value: number;
  expireDate: string;
  used: boolean;
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  points: number;
  level: 'bronze' | 'silver' | 'gold';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}
