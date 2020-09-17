import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrevNextLink } from '../widget/paging';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss']
})
export class PrevNextComponent implements OnInit {

  @Input() paged: PrevNextLink;
  @Output() navigated = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  navigate() {
    this.navigated.emit();
  }
}
