import { LeadResponse } from './LeadResponse';

export interface LeadDetails extends LeadResponse {
  area: number;
  bathrooms: number;
  bedrooms: number;
  street: string;
  direction: number;
  leadPrice: number;
  status: number;
  address?: string;
  boughtAt?: string;
}
