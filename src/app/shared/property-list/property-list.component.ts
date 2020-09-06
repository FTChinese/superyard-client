import { Component, OnInit, Input } from '@angular/core';
import { PropertyItem } from '../widget/property-list'

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  @Input() items: PropertyItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
