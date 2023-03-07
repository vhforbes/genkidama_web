import { Subscription } from './Subscription';

export interface User {
  avatar: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  subscription_id: string;
  updated_at: string;
  verified: boolean;
  role: string;
  subscription?: Subscription;
}
