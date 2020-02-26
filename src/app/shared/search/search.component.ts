import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  @Input() placeHolder = 'Enter a value to search';
  @Output() submitted = new EventEmitter<AbstractControl>();

  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.submitted.emit(this.searchForm.get('search'));
  }
}
