import { Component, OnInit, Input } from '@angular/core';
import { ControlOptions } from '../widget/control';
import { Button } from '../widget/button';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [FormService],
})
export class SearchFormComponent implements OnInit {

  @Input() control: ControlOptions;
  @Input() button: Button;

  form: FormGroup;

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [this.control.key]: new FormControl(this.control.value, this.control.validators)
    });
  }

  onSubmit() {
    this.formService.submit(JSON.stringify(this.form.getRawValue()));
    this.form.disable();
  }
}
