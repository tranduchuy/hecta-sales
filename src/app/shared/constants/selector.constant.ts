// @ts-ignore
import cityDistrictProject from './cityDistrictProject.json';


const priceLevel = [
  [{text: 'Thoả thuận', value: -1},
    {text: '< 500 triệu', value: 1},
    {text: '500 - 800 triệu', value: 2},
    {text: '800 triệu - 1 tỷ', value: 3},
    {text: '1 - 2 tỷ', value: 4},
    {text: '2 - 3 tỷ', value: 5},
    {text: '3 - 5 tỷ', value: 6},
    {text: '5 - 7 tỷ', value: 7},
    {text: '7 - 10 tỷ', value: 8},
    {text: '10 - 20 tỷ', value: 9},
    {text: '20 - 30 tỷ', value: 10},
    {text: '> 30 tỷ', value: 11}],

  [{text: 'Thỏa thuận', value: -1},
    {value: 1, text: '\u003c 1 triệu'},
    {value: 2, text: '1 - 3 triệu'},
    {value: 3, text: '3 - 5 triệu'},
    {value: 4, text: '5 - 10 triệu'},
    {value: 5, text: '10 - 40 triệu'},
    {value: 6, text: '40 - 70 triệu'},
    {value: 7, text: '70 - 100 triệu'},
    {value: 8, text: '\u003e 100 triệu'}]
];

const priceLevel1 = [[{
  'Name': 0, 'Value': 'Thỏa thuận', min: {value: null}, max: {value: null}
}, {
  'Name': 1, 'Value': '\u003c 500 triệu', min: {value: null}, max: {value: 5e8}
}, {
  'Name': 2,
  'Value': '500 - 800 triệu', min: {value: 5e8}, max: {value: 8e8}
}, {
  'Name': 3, 'Value': '800 triệu - 1 tỷ', min: {value: 8e8}, max: {value: 1e9}
}, {
  'Name': 4, 'Value': '1 - 2 tỷ', min: {value: 1e9}, max: {value: 1e9}
}, {
  'Name': 5,
  'Value': '2 - 3 tỷ', min: {value: 2e9}, max: {value: 3e9}
}, {
  'Name': 6, 'Value': '3 - 5 tỷ', min: {value: 3e9}, max: {value: 5e9}
}, {
  'Name': 7, 'Value': '5 - 7 tỷ', min: {value: 5e9}, max: {value: 7e9}
}, {
  'Name': 8, 'Value': '7 - 10 tỷ', min: {value: 7e9}, max: {value: 10e9}
}, {
  'Name': 9,
  'Value': '10 - 20 tỷ', min: {value: 10e9}, max: {value: 20e9}
}, {
  'Name': 10, 'Value': '20 - 30 tỷ', min: {value: 20e9}, max: {value: 30e9}
}, {
  'Name': 11, 'Value': '\u003e 30 tỷ', min: {value: 30e9}, max: {value: null}
}], [{
  'Name': 0,
  'Value': 'Thỏa thuận', min: {value: null}, max: {value: null}
}, {
  'Name': 1, 'Value': '\u003c 1 triệu', min: {value: null}, max: {value: 1e6}
}, {
  'Name': 2, 'Value': '1 - 3 triệu', min: {value: 1e6}, max: {value: 3e6}
}, {
  'Name': 3, 'Value': '3 - 5 triệu', min: {value: 3e6}, max: {value: 5e6}
}, {
  'Name': 4, 'Value': '5 - 10 triệu', min: {value: 5e6}, max: {value: 10e6}
}, {
  'Name': 5, 'Value': '10 - 40 triệu', min: {value: 10e6}, max: {value: 40e6}
}, {
  'Name': 6, 'Value': '40 - 70 triệu', min: {value: 40e6}, max: {value: 70e6}
}, {
  'Name': 7, 'Value': '70 - 100 triệu', min: {value: 70e6}, max: {value: 100e6}
}, {
  'Name': 8, 'Value': '\u003e 100 triệu', min: {value: 100e6}, max: {value: null}
}]];

const cateListBuy = [{
  'id': 400,
  'name': 'Nhà đất cần mua',
  'children': [
    {'id': 402, 'name': 'Mua căn hộ chung cư'},
    {'id': 403, 'name': 'Mua nhà riêng'},
    {'id': 404, 'name': 'Mua nhà biệt thự, liền kề'},
    {'id': 405, 'name': 'Mua nhà mặt phố'},
    {'id': 406, 'name': 'Mua đất nền dự án'},
    {'id': 407, 'name': 'Mua đất'},
    {'id': 408, 'name': 'Mua trang trại, khu nghỉ dưỡng'},
    {'id': 409, 'name': 'Mua kho, nhà xưởng'},
    {'id': 410, 'name': 'Mua loại bất động sản khác'}
  ],
  'prices': [
    {'name': 'Thỏa thuận', 'id': '-1'},
    {'name': 'Trăm nghìn/tháng', 'id': '1'},
    {'name': 'Triệu/tháng', 'id': '2'},
    {'name': 'Trăm nghìn/m2/tháng', 'id': '5'},
    {'name': 'Triệu/m2/tháng', 'id': '6'},
    {'name': 'Nghìn/m2/tháng', 'id': '7'}
  ],
  'priceLevel': priceLevel[0],
  'brokerdomain': null
},
  {
    'id': 401, 'name': 'Nhà đất cần thuê',
    'children': [
      {'id': 411, 'name': 'Cần thuê căn hộ chung cư'},
      {'id': 412, 'name': 'Cần thuê nhà riêng'},
      {'id': 413, 'name': 'Cần thuê nhà mặt phố'},
      {'id': 414, 'name': 'Cần thuê nhà trọ, phòng trọ'},
      {'id': 415, 'name': 'Cần thuê văn phòng'},
      {'id': 416, 'name': 'Cần thuê cửa hàng, ki ốt'},
      {'id': 417, 'name': 'Cần thuê kho, nhà xưởng, đất'},
      {'id': 418, 'name': 'Cần thuê loại bất động sản khác'}
    ],
    'prices': [
      {'name': 'Thỏa thuận', 'id': '-1'},
      {'name': 'Triệu', 'id': '1'},
      {'name': 'Tỷ', 'id': '2'},
      {'name': 'Trăm nghìn/m2', 'id': '6'},
      {'name': 'Triệu/m2', 'id': '7'}
    ],
    'priceLevel': priceLevel[1],
    'brokerdomain': null
  }];

const cateList = [{
  'id': 38,
  'name': 'Nhà đất bán',
  'children': [
    {'id': 324, 'name': 'Bán căn hộ chung cư'},
    {'id': 41, 'name': 'Bán nhà riêng'},
    {'id': 325, 'name': 'Bán nhà biệt thự, liền kề'},
    {'id': 163, 'name': 'Bán nhà mặt phố'},
    {'id': 40, 'name': 'Bán đất nền dự án'},
    {'id': 283, 'name': 'Bán đất'},
    {'id': 44, 'name': 'Bán trang trại, khu nghỉ dưỡng'},
    {'id': 45, 'name': 'Bán kho, nhà xưởng'},
    {'id': 48, 'name': 'Bán loại bất động sản khác'}
  ],
  'prices': [
    {'name': 'Thỏa thuận', 'id': '-1'},
    {'name': 'Triệu', 'id': '1'},
    {'name': 'Tỷ', 'id': '2'},
    {'name': 'Trăm nghìn/m2', 'id': '6'},
    {'name': 'Triệu/m2', 'id': '7'}],
  'priceLevel': priceLevel[0],
  'brokerdomain': [
    {'id': 8, 'name': 'Bán căn hộ chung cư'},
    {'id': 7, 'name': 'Bán đất'},
    {'id': 1, 'name': 'Bán đất nền dự án'},
    {'id': 4, 'name': 'Bán kho, nhà xưởng'},
    {'id': 5, 'name': 'Bán loại bất động sản khác'},
    {'id': 9, 'name': 'Bán nhà biệt thự, liền kề'},
    {'id': 6, 'name': 'Bán nhà mặt phố'},
    {'id': 2, 'name': 'Bán nhà riêng'},
    {'id': 3, 'name': 'Bán trang trại, khu nghỉ dưỡng'}
  ]
},
  {
    'id': 49, 'name': 'Nhà đất cho thuê',
    'children': [
      {'id': 326, 'name': 'Cho thuê căn hộ chung cư'},
      {'id': 52, 'name': 'Cho thuê nhà riêng'},
      {'id': 51, 'name': 'Cho thuê nhà mặt phố'},
      {'id': 57, 'name': 'Cho thuê nhà trọ, phòng trọ'},
      {'id': 50, 'name': 'Cho thuê văn phòng'},
      {'id': 55, 'name': 'Cho thuê cửa hàng, ki ốt'},
      {'id': 53, 'name': 'Cho thuê kho, nhà xưởng, đất'},
      {'id': 59, 'name': 'Cho thuê loại bất động sản khác'}
    ],
    'prices': [
      {'name': 'Thỏa thuận', 'id': '-1'},
      {'name': 'Trăm nghìn/tháng', 'id': '1'},
      {'name': 'Triệu/tháng', 'id': '2'},
      {'name': 'Trăm nghìn/m2/tháng', 'id': '5'},
      {'name': 'Triệu/m2/tháng', 'id': '6'},
      {
        'name': 'Nghìn/m2/tháng', 'id': '7'
      }],
    'priceLevel': priceLevel[1],
    'brokerdomain': [
      {'id': 10, 'name': 'Cho thuê căn hộ chung cư'},
      {'id': 15, 'name': 'Cho thuê cửa hàng, ki ốt'},
      {'id': 14, 'name': 'Cho thuê kho, nhà xưởng, đất'},
      {'id': 16, 'name': 'Cho thuê loại bất động sản khác'},
      {'id': 12, 'name': 'Cho thuê nhà mặt phố'},
      {'id': 13, 'name': 'Cho thuê nhà riêng'},
      {'id': 17, 'name': 'Cho thuê nhà trọ, phòng trọ'},
      {'id': 11, 'name': 'Cho thuê văn phòng'}]
  }];

const vipTypeList = [{'name': 'Tin thường', 'id': '5'}, {'name': 'Tin ưu đãi', 'id': '4'}, {
  'name': 'Tin Vip 3',
  'id': '3'
}, {'name': 'Tin Vip 2', 'id': '2'}, {'name': 'Tin Vip 1', 'id': '1'}, {'name': 'Vip đặc biệt', 'id': '0'}];

const directionList = [{'name': 'KXĐ', 'value': '0'}, {'name': 'Đông', 'value': '1'}, {
  'name': 'Tây',
  'value': '2'
}, {'name': 'Nam', 'value': '3'}, {'name': 'Bắc', 'value': '4'}, {'name': 'Đông-Bắc', 'value': '5'}, {
  'name': 'Tây-Bắc',
  'value': '6'
}, {'name': 'Tây-Nam', 'value': '7'}, {'name': 'Đông-Nam', 'value': '8'}];

const unitPriceList = [113.636, 47.272, 30, 14, 275, 1.2, 0];
const unitPriceListNew = [168.181, 68.181, 50, 27.272, 454.545, 1.727, 0];
const areaList = [{
  'Name': 0, 'Value': 'Chưa xác định', min: {value: null}, max: {value: null}
}, {
  'Name': 1, 'Value': '\u003c 30 m2', min: {value: null}, max: {value: 30}
}, {
  'Name': 2, 'Value': '30 - 50 m2', min: {value: 30}, max: {value: 50}
}, {
  'Name': 3, 'Value': '50 - 80 m2', min: {value: 50}, max: {value: 80}
}, {
  'Name': 4, 'Value': '80 - 100 m2', min: {value: 80}, max: {value: 100}
}, {
  'Name': 5, 'Value': '100 - 150 m2', min: {value: 100}, max: {value: 150}
}, {
  'Name': 6, 'Value': '150 - 200 m2', min: {value: 150}, max: {value: 200}
}, {
  'Name': 7, 'Value': '200 - 250 m2', min: {value: 200}, max: {value: 250}
}, {
  'Name': 8, 'Value': '250 - 300 m2', min: {value: 250}, max: {value: 300}
}, {
  'Name': 9, 'Value': '300 - 500 m2', min: {value: 300}, max: {value: 500}
}, {
  'Name': 11, 'Value': '\u003e 500 m2', min: {value: 500}, max: {value: null}
}];

const sortPost: any[] = [
  {value: 0, text: 'Thông thường', options: {page: 1}},
  {value: 1, text: 'Tin mới nhất', options: {sortDirection: 'DESC', sortBy: 'date', page: 1}},
  {value: 2, text: 'Giá thấp nhất', options: {sortDirection: 'ASC', sortBy: 'price', page: 1}},
  {value: 3, text: 'Giá cao nhất', options: {sortDirection: 'DESC', sortBy: 'price', page: 1}},
  {value: 4, text: 'Diện tích nhỏ nhất', options: {sortDirection: 'ASC', sortBy: 'area', page: 1}},
  {value: 5, text: 'Diện tích lớn nhất', options: {sortDirection: 'DESC', sortBy: 'area', page: 1}}
];

const result = {
  cateList,
  vipTypeList,
  directionList,
  cateListBuy,
  unitPriceList,
  unitPriceListNew,
  priceLevel,
  areaList,
  priceLevel1,
  cityDistrictProject,
  sortPost
};

export default result;
