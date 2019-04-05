export interface LeadResponse {
  _id?: string;
  isPrivate?: string;
  location: string;
  type: string;
  timeToDownPrice?: string;
  timeToDownPriceInMMss?: string;
  isFinishDownPrice?: boolean;
  phone?: string;
  email?: string;
  createdAt: string;
  boughtAt?: string;
  reason?: string;
  price?: number;
  leadPrice?: number;
}
