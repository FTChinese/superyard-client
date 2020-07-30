import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent implements OnInit {

  @Input() title: string;

  constructor(
    readonly modal: ModalService
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.modal.close();
  }
}
