import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message: string;
  timeoutID: number;

  constructor() { }

  show(m: string) {
    this.message = m;

    this.timeoutID = window.setTimeout(this.onDismiss.bind(this), 3000)
  }

  onDismiss() {
    this.message = null;
    window.clearTimeout(this.timeoutID);
  }
}
