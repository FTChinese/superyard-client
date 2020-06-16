import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IRelease } from 'src/app/data/schema/android';
import { AndroidService } from 'src/app/data/service/android.service';

@Component({
  selector: 'app-update-release',
  templateUrl: './update-release.component.html',
  styleUrls: ['./update-release.component.scss'],
})
export class UpdateReleaseComponent implements OnInit {

  release: IRelease;

  constructor(
    private route: ActivatedRoute,
    private androidService: AndroidService,
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const tag = params.get('tag');

        return this.androidService.loadRelease(tag);
      })
    ).subscribe({
      next: data => this.release = data,
      error: err => console.log(err),
    });
  }

  onSubmit(release: IRelease) {
    console.log('Update a release %o', release);
  }
}
