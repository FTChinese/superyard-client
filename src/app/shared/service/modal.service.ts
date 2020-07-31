import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private clsName = 'modal-open';
  on = false;
  // id is used to distinguish which dialog should be
  // shown when there are multiple modal dialogs on
  // on the same page.
  // Use both on and id to determine which one should be visible.
  id: string;

  constructor() { }

  open(id?: string) {
    this.id = id;
    document.body.classList.add(this.clsName);
    this.on = true;
  }

  close() {
    this.id = undefined;
    document.body.classList.remove(this.clsName);
    this.on = false;
  }
}
