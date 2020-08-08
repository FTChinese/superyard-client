import { Component, OnInit, Input } from '@angular/core';
import { MetaItem } from 'src/app/shared/widget/meta-data';

@Component({
  selector: 'app-meta-list',
  templateUrl: './meta-list.component.html',
  styleUrls: ['./meta-list.component.scss']
})
export class MetaListComponent implements OnInit {

  @Input() metaItems: MetaItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
