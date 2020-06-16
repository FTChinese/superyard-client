import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlOptions } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { IRelease } from 'src/app/data/schema/android';
import { AndroidService } from 'src/app/data/service/android.service';
import { switchMap } from 'rxjs/operators';
import { SearchForm } from 'src/app/data/schema/form-data';

@Component({
  selector: 'app-android-home',
  templateUrl: './android-home.component.html',
  styleUrls: ['./android-home.component.scss'],
  providers: [FormService],
})
export class AndroidHomeComponent implements OnInit {

  releases: IRelease[];

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {

  }
}
