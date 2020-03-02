import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-flash',
  template: `
  <ng-container *ngIf="message">
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <span>{{ message }}</span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </ng-container>`,
})
export class FlashComponent  {
  @Input() message: string;

  close() {
    this.message = null;
  }
}
