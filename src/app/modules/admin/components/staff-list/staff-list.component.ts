import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/data/schema/staff';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  profiles: Profile[];

  constructor() { }

  ngOnInit(): void {
  }

}
