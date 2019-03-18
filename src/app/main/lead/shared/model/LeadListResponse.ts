import { LeadResponse } from './LeadResponse';

export interface ListLeadResponse {
  status: number;
  message: string;
  data: {
    meta: {
      totalItems: number;
      limit: number;
      page: number;
    };
    entries: LeadResponse[];
  };
}
