import {environment} from 'environments/environment';

export namespace URLs {
  export const LOGIN = environment.apiEndpoint + '/api/v1/users/login';
  export const FORGOT_PASSWORD = environment.apiEndpoint + '/api/v1/users/forget-password';
  export const RESET_PASSWORD = environment.apiEndpoint + '/api/v1/users/reset-password';
  export const RULE_ALERT_LEAD = '/api/v1/rule-alert-lead';
  export const REGISTER = '/api/v1/users/register';
  export const UPDATE = environment.apiEndpoint + '/api/v1/users/update';
  export const CHECK = environment.apiEndpoint + '/api/v1/users/check';
  export const USER = environment.apiEndpoint + '/api/v1/users/info';
  export const IMAGE_UPLOAD = environment.apiStatic + '/images';
  export const IMAGE = environment.apiStatic + '/images/using/150x150';

  export namespace Lead {
    export const List = `${environment.apiEndpoint}/api/v1/leads`;
  }
  export const RESEND_EMAIL = environment.apiEndpoint + '/api/v1/users/confirm/resend';
}
