import { Component, OnInit, Input } from '@angular/core';
import { Membership } from 'src/app/data/schema/reader';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

  @Input() member: Membership;

  form = this.formBuilder.group({
    tier: ['', [Validators.required]],
    cycle: ['', [Validators.required]],
    expireDate: ['', [Validators.required]],
    payMethod: [''],
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
