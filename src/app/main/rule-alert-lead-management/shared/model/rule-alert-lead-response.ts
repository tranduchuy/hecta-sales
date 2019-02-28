export interface RuleAlertLeadResponse {
  _id?: string;
  formality?: number;
  type?: number;
  city?: string;
  district?: number;
  project?: {
    _id?: string;
    name?: string;
  };
}
