import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IRelease, IReleaseBase } from 'src/app/data/schema/android';
import { Button } from 'src/app/shared/widget/button';
import { ControlOptions } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { SearchForm } from 'src/app/data/schema/form-data';
import { AndroidService } from 'src/app/data/service/android.service';

@Component({
  selector: 'app-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss'],
  providers: [FormService],
})
export class CreateReleaseComponent {

  searchControl: ControlOptions = {
    value: '',
    key: 'keyword',
    validators: [Validators.required, Validators.maxLength(64)],
    placeholder: '1.0.0',
    desc: ''
  };

  button: Button = Button
    .primary()
    .setName('Find');

  release: IRelease;

  constructor(
    private androidService: AndroidService,
    private formService: FormService,
  ) {
    // this.releaseService.formSubmitted$.subscribe(
    //   data => this.createRelease(data)
    // );

    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const search: SearchForm = JSON.parse(data);
        console.log(search);
        return this.androidService.ghRelease(search.keyword);
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
    this.androidService.ghLatest()
      .subscribe({
        next: data => this.release = data,
        error: err => console.log(err),
      });
  }

  createRelease(release: IReleaseBase) {
    console.log(release);
    this.androidService.createRelease(release)
      .subscribe({
        next: ok => console.log(ok),
        // error: err => this.releaseService.sendError(RequestError.fromResponse(err)),
      });
  }
}
