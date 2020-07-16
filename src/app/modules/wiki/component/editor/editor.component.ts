import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    summary: new FormControl(''),
    body: new FormControl('', [Validators.required])
  });

  button: Button = Button.primary().setName('Save');

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formService.submit(JSON.stringify(this.form.value));
  }
}
