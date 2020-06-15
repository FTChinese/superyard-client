import { Component } from '@angular/core';
import { AndroidService } from '../android.service';
import { IRelease, IReleaseBase } from '../../data/schema/android';
import { ReleaseService } from '../release.service';
import { RequestError } from '../../data/schema/request-result';
import { SearchService } from '../../shared/service/search.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss'],
  providers: [ReleaseService, SearchService],
})
export class CreateReleaseComponent {

  release: IRelease;

  constructor(
    private service: AndroidService,
    private releaseService: ReleaseService,
    private searchService: SearchService,
  ) {
    this.releaseService.formSubmitted$.subscribe(
      data => this.createRelease(data)
    );

    this.searchService.valueSubmitted$.pipe(
      switchMap(control => {
        console.log(control);
        return this.service.ghRelease(control.value);
      })
    ).subscribe({
      next: data => {
        console.log(data);
        this.release = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // onSearch(control: AbstractControl) {

  //   this.service.ghRelease(control.value)
  //     .subscribe({
  //       next: data => {
  //         console.log(data);
  //         this.release = data;
  //       },
  //       error: err => {
  //         console.log(err);
  //       }
  //     });
  // }

  getLatestRelease() {
    this.service.ghLatest()
      .subscribe({
        next: data => this.release = data,
        error: err => console.log(err),
      });
  }

  createRelease(release: IReleaseBase) {
    console.log(release);
    this.service.createRelease(release)
      .subscribe({
        next: ok => console.log(ok),
        error: err => this.releaseService.sendError(RequestError.fromResponse(err)),
      });
  }
}
