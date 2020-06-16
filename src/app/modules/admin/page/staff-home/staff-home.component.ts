import { Component, OnInit } from '@angular/core';
import { DynamicControl, InputControl, ControlOptions } from 'src/app/shared/widget/control';
import { Alert } from 'src/app/shared/widget/alert';
import { Button } from 'src/app/shared/widget/button';
import { Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { switchMap } from 'rxjs/operators';
import { SearchForm } from 'src/app/data/schema/form-data';
import { of } from 'rxjs';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss'],
  providers: [FormService],
})
export class StaffHomeComponent implements OnInit {

  searchControl: ControlOptions = {
    value: '',
    key: 'keyword',
    validators: [Validators.required, Validators.maxLength(64)],
    placeholder: 'User name',
    desc: 'You can find an employee by searching user name, or create one if it is not found.'
  };

  button: Button = Button
    .primary()
    .setName('Search');

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const search: SearchForm = JSON.parse(data);

        return of({ userName: search.keyword });
      })
    )
    .subscribe({
      next: data => {
        console.log('Searching %o', data)
      },
      error: err => {
        console.log(err);
        const errResp = RequestError.fromResponse(err);
        this.formService.sendError(errResp);
      }
    })
  }

}
