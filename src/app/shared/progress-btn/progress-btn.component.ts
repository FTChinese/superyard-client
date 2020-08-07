import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../widget/button';

@Component({
  selector: 'app-progress-btn',
  templateUrl: './progress-btn.component.html',
  styleUrls: ['./progress-btn.component.scss']
})
export class ProgressBtnComponent implements OnInit {

  @Input() button: Button;
  // Allow explicitly disabled the button. A disabled button does not
  // indicates spinner should show up. If disabled is false, we will
  // futher look whether button is in proress state. If it is, the button
  // is disabled since you should always disable it when in progress.
  // If you do not set the disabled value, things becomes simpler as the
  // button's disabled state is solely determined by the button.inProgress.
  // This variable exists mostly to handle form.valid state.
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
