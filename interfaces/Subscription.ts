export interface Subscription {
  id: string;
  user_id: string;
  email?: string;
  status: string;
  type?: string;
  paypal_subscription_id: string;
  plan_id: string;
  current_period_start: string;
  current_period_end: string;
  canceled_at: string;
  cancelation_reason: string;
}
