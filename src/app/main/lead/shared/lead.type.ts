export namespace LeadType {
  export const NEW = 30; // lead mới
  export const SOLD = 31; // đã bán (vẫn đang trong giai đoạn có thể trả lại)
  export const RETURNING = 32; // đang đợi admin duyệt trả lead
  export const FINISHED = 33; // đã qua thời gian trả lead, đây là trạng thái cuối cùng
  export const NO_RETURN = 34;
  export const RETURN_AND_REFUND = 35;
}
