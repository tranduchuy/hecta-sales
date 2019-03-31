import { FuseNavigation } from '@fuse/types';
import { environment as environmentDev } from 'environments/environment';
import { LeadType } from '../main/lead/shared/lead.type';

export const componentList: FuseNavigation[] = [
  {
    id: 'component-list',
    title: 'Component list',
    translate: 'COMPONENT_LIST.TITLE',
    type: 'item',
    icon: '',
    url: '/component-list'
  }
];

export const navigation: FuseNavigation[] = [
  {
    id: 'main-account-1',
    title: 'Tài khoản chính 1',
    translate: 'MAIN_ACCOUNT_1.TITLE',
    type: 'item',
    icon: 'label',
    url: '/sample',
    badge: {
      title: '150.000',
      bg: '#525e8a',
      fg: '#FFFFFF'
    }
  },
  {
    id: 'main-account-2',
    title: 'Tài khoản chính 2',
    translate: 'MAIN_ACCOUNT_2.TITLE',
    type: 'item',
    icon: 'label',
    url: '/sample',
    badge: {
      title: '50.000',
      bg: '#525e8a',
      fg: '#FFFFFF'
    }
  },
  {
    id: 'promotion-account',
    title: 'Tài khoản khuyến mãi',
    translate: 'PROMOTION_ACCOUNT.TITLE',
    type: 'item',
    icon: 'label',
    url: '/sample',
    badge: {
      title: '30.000',
      bg: '#525e8a',
      fg: '#FFFFFF'
    }
  },
  {
    id: 'credit-account',
    title: 'Tài khoản tín dụng',
    translate: 'CREDIT_ACCOUNT.TITLE',
    type: 'item',
    icon: 'label',
    url: '/sample',
    badge: {
      title: '0',
      bg: '#525e8a',
      fg: '#FFFFFF'
    }
  },
  {
    id: 'home',
    title: 'Trang chủ',
    translate: 'NAV.HOME',
    type: 'group',
    children: [
      {
        id: 'leads',
        title: 'Leads',
        translate: 'NAV.LEADS',
        type: 'collapsable',
        icon: 'face',
        children: [
          {
            id: 'new-leads',
            title: 'Mới',
            translate: 'NEW_LEADS.TITLE',
            type: 'item',
            icon: '',
            url: '/khach-hang-tiem-nang',
            exactMatch: true,
            queryParams: {type: LeadType.NEW}
          },
          {
            id: 'assign-leads',
            title: 'Đã nhận',
            translate: 'ASSIGN_LEADS.TITLE',
            type: 'item',
            icon: '',
            url: '/khach-hang-tiem-nang',
            queryParams: {type: LeadType.SOLD}
          },
          {
            id: 'completed-leads',
            title: 'Hoàn thành',
            translate: 'COMPLETED_LEADS.TITLE',
            type: 'item',
            icon: '',
            url: '/khach-hang-tiem-nang',
            queryParams: {type: LeadType.FINISHED}
          },
          {
            id: 'rejected-leads',
            title: 'Trả leads/Hoàn tiền',
            translate: 'REJECTED_LEADS.TITLE',
            type: 'item',
            icon: '',
            url: '/khach-hang-tiem-nang',
            queryParams: {type: LeadType.RETURNING}
          }
        ]
      }
    ]
  },
  {
    id: 'leads-management',
    title: 'Quản lý nhận leads',
    translate: 'NAV.LEADS_MANAGEMENT',
    type: 'collapsable',
    icon: 'assignment_ind',
    children: [
      {
        id: 'lead-registration',
        title: 'Đăng ký nhận Lead',
        translate: 'LEAD_REGISTRATION.TITLE',
        type: 'item',
        icon: '',
        exactMatch: true,
        url: '/rule-alert-lead/add'
      },
      {
        id: 'lead-zone',
        title: 'Khu vực/Dự án nhận leads',
        translate: 'LEAD_ZONE.TITLE',
        type: 'item',
        icon: '',
        exactMatch: true,
        url: '/rule-alert-lead/list'
      }
    ]
  },
  {
    id: 'articles-management',
    title: 'Quản lý tin đăng',
    translate: 'NAV.ARTICLES_MANAGEMENT',
    type: 'collapsable',
    icon: 'notes',
    url: '/post',
    children: [
      {
        id: 'sale-article-management',
        title: 'Quản lý tin rao bán/cho thuê',
        translate: 'SALE_ARTICLE_MANAGEMENT.TITLE',
        type: 'item',
        icon: '',
        url: '/sample'
      },
      {
        id: 'post-sale-article',
        title: 'Đăng tin rao bán/cho thuê',
        translate: 'POST_SALE_ARTICLE.TITLE',
        type: 'item',
        icon: '',
        url: '/sample'
      },
      {
        id: 'buy-article-management',
        title: 'Quản lý tin cần mua/cần thuê',
        translate: 'BUY_ARTICLE_MANAGEMENT.TITLE',
        type: 'item',
        icon: '',
        url: '/sample'
      },
      {
        id: 'post-buy-article',
        title: 'Đăng tin cần mua/cần thuê',
        translate: 'POST_BUY_ARTICLE.TITLE',
        type: 'item',
        icon: '',
        url: '/post/post-buy-article'
      }
    ]
  },
  {
    id: 'financial-management',
    title: 'Quản lý tài chính',
    translate: 'NAV.FINANCIAL_MANAGEMENT',
    type: 'collapsable',
    icon: 'monetization_on',
    children: [
      {
        id: 'financial-management-list',
        title: 'Tổng quan',
        translate: 'FINANCIAL_LIST.TITLE',
        type: 'item',
        icon: '',
        exactMatch: true,
        url: '/quan-ly-tai-chinh'
      },
      {
        id: 'transactions-history',
        title: 'Lịch sử giao dịch',
        translate: 'TRANSACTIONS_HISTORY.TITLE',
        type: 'item',
        icon: '',
        exactMatch: true,
        url: '/quan-ly-tai-chinh/giao-dich'
      },
      {
        id: 'business-account-management',
        title: 'Quản lý tài khoản doanh nghiệp',
        translate: 'BUSINESS_ACCOUNT_MANAGEMENT.TITLE',
        type: 'item',
        icon: '',
        exactMatch: true,
        url: '/home'
      },
      {
        id: 'recharge-account',
        title: 'Nạp tiền vào tài khoản',
        translate: 'RECHARGE_ACCOUNT.TITLE',
        type: 'item',
        icon: '',
        exactMatch: true,
        url: '/quan-ly-tai-chinh/nap-tien'
      }
    ]
  },
  {
    id: 'account-management',
    title: 'Quản lý tài khoản',
    translate: 'NAV.ACCOUNT_MANAGEMENT',
    type: 'collapsable',
    icon: 'supervisor_account',
    children: [
      {
        id: 'update-personal-information',
        title: 'Thay đổi thông tin cá nhân',
        translate: 'UPDATE_PERSONAL_INFORMATION.TITLE',
        type: 'item',
        icon: '',
        url: '/user/update'
      },
      {
        id: 'update-password',
        title: 'Thay đổi mật khẩu',
        translate: 'UPDATE_PASSWORD.TITLE',
        type: 'item',
        icon: '',
        url: '/user/update-password'
      }
    ]
  },
  {
    id: 'inbox',
    title: 'Hộp tin nhắn',
    translate: 'INBOX.TITLE',
    type: 'item',
    icon: 'chat',
    url: '/tin-nhan'
  },
  {
    id: 'logout',
    title: 'Đăng xuất',
    translate: 'LOGOUT.TITLE',
    type: 'item',
    icon: 'exit_to_app',
    url: '/logout'
  },
  // {
  //   id: 'applications',
  //   title: 'Applications',
  //   translate: 'NAV.APPLICATIONS',
  //   type: 'group',
  //   children: [
  //     {
  //       id: 'rule-alert-lead',
  //       title: 'Rule alert lead',
  //       translate: 'RULE_ALERT_LEAD.TITLE',
  //       type: 'item',
  //       icon: '',
  //       url: '/rule-alert-lead/list'
  //     }
  //   ]
  // }
];

if (!environmentDev.production) {
  navigation.push(...componentList);
}
