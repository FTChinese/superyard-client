import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../widget/paging';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pg: Pagination;
  @Output() flipped = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  gotoPage(n: number) {
    this.flipped.next(n);
  }
}
