import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'typeFilter'
})
export class TypeFilterPipe implements PipeTransform {

    transform(type: any): string {
        switch (type) {
            case 1: return "Nộp tiền vào TK chính"
            case 2: return "Nộp tiền vào TK khuyến mãi"
            case 3: return "Phí đăng tin rao"
            case 4: return "Chuyền tiền Credit cho TK Con"
            case 5: return "Nhận tiền Credit từ TK Cha"
            case 6: return "Khách hàng làm mới tin đăng"
            case 7: return "Trả lại tiền cho TK cha"
            case 8: return "Thu hồi tiền từ TK con"
            case 9: return "Trả tiền theo lượt view"
            case 10: return "Phí mua lead"
            default: break;
        }
    }
}
