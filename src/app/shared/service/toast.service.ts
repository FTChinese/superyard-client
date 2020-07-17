import { Injectable } from '@angular/core';
import { AlertType } from '../widget/alert';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message: string;
  timeoutID: number;
  style: AlertType = 'primary';
  get styleClassName(): string {
    return `alert-${this.style}`;
  }

  constructor() { }

  show(m: string) {
    this.message = m;

    this.timeoutID = window.setTimeout(this.onDismiss.bind(this), 3000);
  }

  info(m: string) {
    this.style = 'primary';

    this.show(m);
  }

  error(m: string) {
    this.style = 'danger';

    this.show(m);
  }


  onDismiss() {
    this.message = null;
    window.clearTimeout(this.timeoutID);
  }
}
