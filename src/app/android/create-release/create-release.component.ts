import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss']
})
export class CreateReleaseComponent implements OnInit {
  placeHolder = 'v1.0.0';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(control: AbstractControl) {
    console.log(control);
  }
}
