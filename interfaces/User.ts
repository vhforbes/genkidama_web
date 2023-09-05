import { Subscription } from './Subscription';

export interface User {
  id: string;
  email: string;
  name: string;
  exchangeUID?: string;
  avatar?: string;
  subscription_id?: string;
  verified?: boolean;
  role?: string;
  exchange?: string;
  telegramId?: number;
  subscription?: Subscription;
  updated_at?: string;
  created_at?: string;
  exchangePartner?: boolean;
  onTelegramGroup?: boolean;
}
