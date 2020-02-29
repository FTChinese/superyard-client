import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AndroidService } from '../android.service';
import { IRelease } from 'src/app/models/android';

@Component({
  selector: 'app-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss']
})
export class CreateReleaseComponent implements OnInit {
  placeHolder = 'v1.0.0';
  release: IRelease;

  constructor(
    private service: AndroidService,
  ) { }

  ngOnInit(): void {
  }

  onSearch(control: AbstractControl) {
    console.log(control);

    this.service.ghRelease(control.value)
      .subscribe({
        next: data => {
          console.log(data);
          this.release = data;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getLatestRelease() {
    this.service.ghLatest()
      .subscribe({
        next: data => this.release = data,
        error: err => console.log(err),
      });
  }

  onSubmit(release: IRelease) {
    console.log(release);
  }
}
