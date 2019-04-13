// import { ISelectSortOption } from '../components/select/select.component';

export const infoTypes: any[] = [
  {value: '6', text: 'Tin thường'},
  {value: '5', text: 'Tin ưu đãi'},
  {value: '4', text: 'Tin Vip 3'},
  {value: '3', text: 'Tin Vip 2'},
  {value: '2', text: 'Tin Vip 1'},
  {value: '1', text: 'Vip đặc biệt'}
];

export namespace InfoTypes {
  export const Normal = '5';
  export const Exciting = '4';
  export const Vip3 = '3';
  export const Vip2 = '2';
  export const Vip1 = '1';
  export const Special = '0';
};

const a = [{
  dongia: '1 nghìn 727 đồng/Ngày',
  gia: 1727,
  txt: '<strong>Tin thường</strong>: Là loại tin đăng bằng chữ <font color="#009AD2">màu xanh</font>, khung <font color="#009AD2">màu xanh</font>'
}, {
  dongia: '454 nghìn 545 đồng',
  gia: 454545,
  txt: '<strong>Vip ưu đãi</strong>: Là loại tin được hiển thị trong vòng 3 tháng, mỗi tuần sẽ được up tin tự động 1 lần. Tuần đầu tiên sẽ được hiển thị dưới hình thức VIP 2, các tuần tiếp theo hiển thị hình thức tin thường'
}, {
  dongia: '27 nghìn 272 đồng/Ngày',
  gia: 27272,
  txt: '<strong>Tin Vip 3</strong>: Là loại tin đăng bằng chữ <font color="#FF6600">thường màu cam,</font> khung <font color="#FF6600">màu cam</font> và luôn nằm dưới tin Vip 2 nhưng luôn luôn hiển thị trên tin thường.'
}, {
  dongia: '50 nghìn/Ngày',
  gia: 5e4,
  txt: '<strong>Tin Vip 2</strong>: Là loại tin đăng bằng chữ <font color="#FF6600"><strong>IN HOA MÀU CAM</strong></font>, khung <font color="#FF6600"><strong>màu cam</strong></font>, nằm bên dưới tin VIP 1 và ở trên các tin vip 3'
}, {
  dongia: '68 nghìn 181 đồng/Ngày',
  gia: 68181,
  txt: '<strong>Tin Vip 1</strong>: Là loại tin được đăng tiêu đề bằng chữ <font color="#DF1B23"> <strong>IN HOA MÀU ĐỎ</strong></font>, khung <font color="#DF1B23"><strong>màu đỏ,</strong></font> nằm bên dưới tin VIP ĐẶC BIỆT và ở trên các tin vip 2'
}, {
  dongia: '168 nghìn 181 đồng/Ngày',
  gia: 168181,
  txt: '<strong>Vip đặc biệt</strong>: Là loại tin được đăng tiêu đề bằng chữ <font color="#DF1B23"> <strong>IN HOA MÀU ĐỎ</strong></font>, khung <font color="#DF1B23"><strong>màu đỏ,</strong></font> hiển thị ở top đầu trang tin và được hưởng nhiều ưu tiên nhất'
}];

export const unitByType = {
  6: a[0],
  5: a[1],
  4: a[2],
  3: a[3],
  2: a[4],
  1: a[5]
};
