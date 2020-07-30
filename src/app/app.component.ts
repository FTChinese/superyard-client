import { Component, OnInit } from '@angular/core';
import { ModalService } from './shared/service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    readonly modal: ModalService,
  ) { }

  ngOnInit() {

  }
}
