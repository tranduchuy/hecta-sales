export interface LeadResponse {
  _id?: string;
  location: string;
  type: string;
  timeToDownPrice: string;
  timeToDownPriceInMMss?: string;
  phone: string;
  createAt: string;
  reason: string;
  price: number;
}
