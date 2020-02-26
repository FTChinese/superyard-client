import { Component, OnInit } from '@angular/core';
import { AndroidService } from '../android.service';
import { IRelease } from 'src/app/models/android';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  releases: IRelease[];

  constructor(
    private service: AndroidService,
  ) { }

  ngOnInit(): void {
    this.service.listReleases()
      .subscribe({
        next: data => {
          this.releases = data;
        },
        error: err => console.log(err),
      });
  }

}
