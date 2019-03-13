import { environment } from "environments/environment.hmr";

export namespace URLs {
  export const LOGIN = environment.apiEndpoint + '/api/v1/users/login';
  export const FORGOT_PASSWORD = environment.apiEndpoint + '/api/v1/users/forget-password';
  export const RESET_PASSWORD = environment.apiEndpoint + '/api/v1/users/reset-password';
  export const RULE_ALERT_LEAD = '/api/v1/rule-alert-lead';
  export const REGISTER = environment.apiEndpoint + '/api/v1/users/register';
  export const CHECK = environment.apiEndpoint + '/api/v1/users/check';
  export const USER = '/api/v1/users/update';
  export const RESEND_EMAIL = environment.apiEndpoint + '/api/v1/users/confirm/resend';
}
