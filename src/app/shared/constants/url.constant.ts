import { environment } from 'environments/environment';

export namespace URLs {
  export const uploadImage = environment.serverImage + 'images';
  export const getImage = environment.apiEndpoint + 'api/v1/images/get/{id}';
  export const LOGIN = environment.apiEndpoint + '/api/v1/users/login';
  export const FORGOT_PASSWORD = environment.apiEndpoint + '/api/v1/users/forget-password';
  export const RESET_PASSWORD = environment.apiEndpoint + '/api/v1/users/reset-password';
  export const RULE_ALERT_LEAD = '/api/v1/rule-alert-lead';
  export const REGISTER = '/api/v1/users/register';
  export const UPDATE = environment.apiEndpoint + '/api/v1/users/update';
  export const CHECK = environment.apiEndpoint + '/api/v1/users/check';
  export const INBOX = environment.apiEndpoint + '/api/v1/notifies';

  export const vipTypeList = environment.apiEndpoint + '/api/v1/vips/list';
  export namespace Sale {
    export const updateAdStatus = environment.apiEndpoint + '/api/v1/sales/updateAdStatus/{id}';
    export const upNew = environment.apiEndpoint + '/api/v1/sales/upnew/{id}';
    export const updateBudgetPerDay = environment.apiEndpoint + '/api/v1/sales/updateBudgetPerDay/{id}';
    export const updateCPV = environment.apiEndpoint + '/api/v1/sales/updateCPV/{id}';
    export const updatePostSale = environment.apiEndpoint + '/api/v1/sales/update/{id}';
    export const createSale = environment.apiEndpoint + '/api/v1/sales/add';
  }
  export namespace Post {
    export const postDetail = environment.apiEndpoint + '/api/v1/posts/detail/';
    export const createBuy = environment.apiEndpoint + '/api/v1/buys/add';
    export const updateBuy = environment.apiEndpoint + '/api/v1/buys/update/{id}';
    export const listPost = environment.apiEndpoint + '/api/v1/posts/list';

  }
  export const USER = environment.apiEndpoint + '/api/v1/users/info';
  export const IMAGE_UPLOAD = environment.apiStatic + '/images';
  export const IMAGE = environment.apiStatic + '/images/using/200x200';
  export const TRANSACTIONS_HISTORY = environment.apiEndpoint + '/api/v1/users/transaction/history';

  export namespace Lead {
    export const List = `${environment.apiEndpoint}/api/v1/leads`;
    export const BuyLead = `${environment.apiEndpoint}/api/v1/leads/purchase`;
    export const ReturnLead = `${environment.apiEndpoint}/api/v1/leads/refund`;
  }

  export const NOTIFY = `${environment.apiEndpoint}/api/v1/notifies/return-lead`;

  export const RESEND_EMAIL = environment.apiEndpoint + '/api/v1/users/confirm/resend';

  export namespace OrgManagement {
    export const ChildList = `${environment.apiEndpoint}/api/v1/users/children`;
    export const FindByEmail = `${environment.apiEndpoint}/api/v1/users/find`;
    export const ChildDetails = `${environment.apiEndpoint}/api/v1/users/child/detail`;
    export const AddNewChild = `${environment.apiEndpoint}/api/v1/users/child/register`;
    export const AddExistedChild = `${environment.apiEndpoint}/api/v1/users/child/request`;
    export const TransferMoney = `${environment.apiEndpoint}/api/v1/users/child/credit/share`;
    export const DeleteChild = `${environment.apiEndpoint}/api/v1/users/child/remove`;
  }
}
