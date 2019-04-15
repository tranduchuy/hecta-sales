export namespace General {
  export namespace Gender {
    export const GENDER_MALE = 1;
    export const GENDER_FEMALE = 2;
  }

  export namespace Type {
    export const TYPE_BUSINESS = 1;
    export const TYPE_PERSONAL = 2;
  }

  export namespace AdStatus {
    export const PAID_FORM_VIEW_ACTIVE =  40;
    export const PAID_FORM_VIEW_STOP =  50;
  }

  export namespace BankLogo {
    export const DONG_A = 'https://hecta.vn/assets/images/bank-donga.png';
    export const ACB = 'https://hecta.vn/assets/images/bank-acb.png'
  }
  export namespace SizeImage {
    export const S120x90 = '120x90';
    export const S200x200 = '200x200';
    export const S82x82 = '82x82';
    export const S150x150 = '150x150';
    export const S745x510 = '745x510';
    export const S255x180 = '255x180';
    export const S640x430 = '640x430';
    export const S164x170 = '164x170';
  }

  export namespace Notification {
    export const SEEN = 21;
    export const NONE = 20;
  }

  export namespace PAID_FORM {
    export const DAY = 1;
    export const VIEW = 2;
  }

  export namespace Notify {
    export const RETURN_LEAD_FAIL = 22;
    export const RETURN_LEAD_SUCCESSFULLY = 21;
  }

  export const PriorityList = [
    {id: -1, name: 'Chọn loại tin'},
    {id: 1, name: 'Tin vip đặc biệt'},
    {id: 2, name: 'Tin vip 1'},
    {id: 3, name: 'Tin vip 2'},
    {id: 4, name: 'Tin vip 3'},
    {id: 5, name: 'Tin ưu đãi'},
    {id: 6, name: 'Tin thường'},
  ];

}