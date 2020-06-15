import { Component, OnInit } from '@angular/core';
import { ReleaseService } from '../release.service';
import { AndroidService } from '../android.service';
import { IRelease } from '../../data/schema/android';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-release',
  templateUrl: './update-release.component.html',
  styleUrls: ['./update-release.component.scss'],
  providers: [ReleaseService],
})
export class UpdateReleaseComponent implements OnInit {

  release: IRelease;

  constructor(
    private route: ActivatedRoute,
    private service: AndroidService,
    private releaseService: ReleaseService,
  ) {
    this.releaseService.formSubmitted$.pipe(
      switchMap(release => this.service.updateRelease(release))
    ).subscribe({
      next: ok => console.log(ok),
      error: err => console.log(err)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const tag = params.get('tag');

        return this.service.loadRelease(tag);
      })
    ).subscribe({
      next: data => this.release = data,
      error: err => console.log(err),
    });
  }

}
