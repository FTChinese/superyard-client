import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flash',
  template: `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <span>{{ message }}</span>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="closed.next()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
`,
})
export class FlashComponent  {
  @Input() message: string;

  @Output()
  closed = new EventEmitter();
}
