import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { IRelease } from 'src/app/data/schema/android';

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
