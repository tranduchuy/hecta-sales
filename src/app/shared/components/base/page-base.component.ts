import { FormGroup } from '@angular/forms';

export abstract class PageBaseComponent {
  constructor() {
    
  }

  getErrors(form: FormGroup, controlName: string): string[] {
    return ['Ahihi', 'demo 1', 'demo 2'];
  }
}
