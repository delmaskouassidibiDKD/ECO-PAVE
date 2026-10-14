export type ScreenId =
  | 'screen-home'
  | 'screen-map'
  | 'screen-report'
  | 'screen-market'
  | 'screen-waste-detail'
  | 'screen-product-detail'
  | 'screen-chat'
  | 'screen-settings'
  | 'screen-onboard1'
  | 'screen-onboard2';

export interface UserStats {
  name: string;
  email: string;
  city: string;
  commune: string;
  avatarUrl: string;
  kgRecycled: number;
  points: number;
  todayPoints: number;
  rank: string;
  rankProgressPercent: number;
}

export interface BorneLocation {
  id: string;
  name: string;
  commune: string;
  distance: string;
  status: 'Ouvert' | 'Maintenance' | 'Bientôt saturé';
  accepted: string;
  hours: string;
  walkTime: string;
  description: string;
  pointsRate: string;
  imageUrl: string;
  xPercent: number;
  yPercent: number;
}

export interface MarketItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'pet' | 'caps' | 'glass' | 'metal' | 'all';
  weightKg?: number;
  points?: number;
  priceFcfa?: number;
  rating: number;
  imageUrl: string;
  targetScreen?: ScreenId;
  description?: string;
  grade?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'Alex' | 'Amanda';
  text: string;
  time: string;
  isUser: boolean;
}
