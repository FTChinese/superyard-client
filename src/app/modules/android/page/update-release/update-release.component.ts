import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AndroidRelease } from 'src/app/data/schema/android';
import { AndroidService } from 'src/app/data/service/android.service';

@Component({
  selector: 'app-update-release',
  templateUrl: './update-release.component.html',
  styleUrls: ['./update-release.component.scss'],
})
export class UpdateReleaseComponent implements OnInit {

  release: AndroidRelease;

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

  onSubmit(release: AndroidRelease) {
    console.log('Update a release %o', release);
  }
}
