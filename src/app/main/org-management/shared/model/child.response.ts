export interface ChildResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  status: number;
  balance: {
    credit: number;
    creditUsed: number;
  };
}
