import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private clsName = 'modal-open';
  on = false;

  constructor() { }

  open() {
    document.body.classList.add(this.clsName);
    this.on = true;
  }

  close() {
    document.body.classList.remove(this.clsName);
    this.on = false;
  }
}
