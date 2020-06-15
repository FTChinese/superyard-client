import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/data/schema/oauth';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  apps: IApiApp[];

  constructor() { }

  ngOnInit(): void {
  }

}
