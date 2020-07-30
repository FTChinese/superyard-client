import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.scss']
})
export class ModalCancelComponent implements OnInit {

  constructor(
    readonly modal: ModalService
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.modal.close();
  }
}
