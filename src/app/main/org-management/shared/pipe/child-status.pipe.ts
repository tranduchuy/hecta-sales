import { Pipe, PipeTransform } from '@angular/core';
import { ChildStatus } from '../child-status';

@Pipe({
  name: 'childStatus'
})
export class ChildStatusPipe implements PipeTransform {

  transform(type: any): string {
    switch (type) {
      case ChildStatus.ACCEPTED:
        return 'Accepted';
      case ChildStatus.WAITING:
        return 'Waiting';
      case ChildStatus.REJECTED:
        return 'Rejected';
      default:
        break;
    }
  }
}
