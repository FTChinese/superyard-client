import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss'],
})
export class StaffHomeComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  onKeyword(kw: string) {

    this.router.navigate(['search-results'], {
      relativeTo: this.route,
      queryParams: {
        keyword: kw,
      },
    });
  }
}
