import { Component, OnInit } from '@angular/core';
import { ControlOptions } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { SearchForm } from 'src/app/data/schema/form-data';
import { ActivatedRoute, Router } from '@angular/router';

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
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const keyword = params.get('keyword');
      if (keyword) {
        this.searchControl.value = keyword;
      }
    });

    this.formService.formSubmitted$
      .subscribe(data => {
        const search: SearchForm = JSON.parse(data);
        console.log('Searching %o', search);

        this.router.navigate(['search-results'], {
          relativeTo: this.route,
          queryParams: search,
        });
      });
  }

}
