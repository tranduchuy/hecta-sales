import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'component-list',
        title: 'Component list',
        translate: 'COMPONENT_LIST.TITLE',
        type: 'item',
        icon: '',
        url: '/component-list'
      },
      {
        id: 'rule-alert-lead',
        title: 'Rule alert lead',
        translate: 'RULE_ALERT_LEAD.TITLE',
        type: 'item',
        icon: '',
        url: '/rule-alert-lead/list'
      }
    ]
  }
];
