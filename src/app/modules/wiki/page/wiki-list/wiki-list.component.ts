import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/shared/widget/link';
import { Button } from 'src/app/shared/widget/button';

@Component({
  selector: 'app-wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.scss']
})
export class WikiListComponent implements OnInit {

  menuItems: Link[] = [
    {
      name: 'Menu A',
      href: '.',
    },
    {
      name: 'Menu B',
      href: '.'
    }
  ];
  button = Button.menu().setName('More');

  constructor() { }

  ngOnInit(): void {
  }

}
