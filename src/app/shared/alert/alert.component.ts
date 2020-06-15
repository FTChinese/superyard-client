import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Alert } from '../widget/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alert: Alert;

  @Output() dismissed = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  dismiss() {
    this.dismissed.emit();
  }
}
