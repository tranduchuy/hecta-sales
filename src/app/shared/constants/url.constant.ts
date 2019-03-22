import {environment} from 'environments/environment';

export namespace URLs {
  export const uploadImage = environment.serverImage + 'images';
  export const getImage = environment.apiEndpoint + 'api/v1/images/get/{id}';
  export const LOGIN = environment.apiEndpoint + '/api/v1/users/login';
  export const FORGOT_PASSWORD = environment.apiEndpoint + '/api/v1/users/forget-password';
  export const RESET_PASSWORD = environment.apiEndpoint + '/api/v1/users/reset-password';
  export const RULE_ALERT_LEAD = '/api/v1/rule-alert-lead';
  export const REGISTER = environment.apiEndpoint + '/api/v1/users/register';
  export const CHECK = environment.apiEndpoint + '/api/v1/users/check';
  export const USER = '/api/v1/users/update';
  export namespace Post {
    export const postDetail = environment.apiEndpoint + '/api/v1/posts/detail/';
    export const createBuy = environment.apiEndpoint + '/api/v1/buys/add';
    export const updateBuy = environment.apiEndpoint + '/api/v1/buys/update/{id}';
  }

  export namespace Lead {
    export const List = `${environment.apiEndpoint}/api/v1/leads`;
  }
  export const RESEND_EMAIL = environment.apiEndpoint + '/api/v1/users/confirm/resend';
}
