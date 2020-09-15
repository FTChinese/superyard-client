import { Component, Input, OnInit } from '@angular/core';
import { PrevNextLink } from '../widget/paging';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss']
})
export class PrevNextComponent implements OnInit {

  @Input() link: PrevNextLink;

  constructor() { }

  ngOnInit(): void {
  }

}
