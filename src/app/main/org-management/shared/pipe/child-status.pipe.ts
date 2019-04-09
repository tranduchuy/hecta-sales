import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'childStatus'
})
export class ChildStatusPipe implements PipeTransform {

  transform(type: any): string {
    switch (type) {
      case 8:
        return 'Accepted';
      case 9:
        return 'Waiting';
      case 10:
        return 'Rejected';
      default:
        break;
    }
  }
}
