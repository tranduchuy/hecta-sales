import { LeadResponse } from './LeadResponse';

export interface LeadDetails extends LeadResponse {
  area: number;
  bathrooms: number;
  bedrooms: number;
  street: string;
  direction: number;
  status: number;
  address?: string;
}
