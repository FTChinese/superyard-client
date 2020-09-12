import { Component, Input, OnInit } from '@angular/core';
import { Paging } from '../widget/paging';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss']
})
export class PrevNextComponent implements OnInit {

  @Input() items = 0;

  @Input()
  set current(p: Paging) {
    if (p.page > 1) {
      this.previous = {
        page: p.page - 1,
      };
    } else {
      this.previous = undefined;
    }

    if (this.items >= p.perPage) {
      this.next = {
        page: p.page + 1
      };
    } else {
      this.next = undefined;
    }
  }

  previous: Paging;
  next: Paging;

  constructor() { }

  ngOnInit(): void {
  }

}
