import { Component, Input, OnInit } from '@angular/core';
import { Paged, Paging } from '../widget/paging';

interface PagingParam {
  page: number;
}

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss']
})
export class PrevNextComponent implements OnInit {

  @Input() paged: Paged;

  get previous(): PagingParam | null {
    if (!this.paged) {
      return null
    }

    if (this.paged.page === 1) {
      return null;
    }

    if (this.paged.count === 0) {
      return null;
    }

    return {
      page: this.paged.page - 1,
    };
  }

  get next(): PagingParam | null {
    if (!this.paged) {
      return null;
    }

    if (this.paged.count === 0) {
      return null;
    }

    if (this.paged.count < this.paged.perPage) {
      return null;
    }

    return {
      page: this.paged.page + 1,
    };
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.previous)
    console.log(this.next)
  }

}
