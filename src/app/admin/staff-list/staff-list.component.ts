import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/staff';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  profiles: IProfile[];

  constructor() { }

  ngOnInit(): void {
  }

}
