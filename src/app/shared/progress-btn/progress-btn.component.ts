import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../widget/button';

@Component({
  selector: 'app-progress-btn',
  templateUrl: './progress-btn.component.html',
  styleUrls: ['./progress-btn.component.scss']
})
export class ProgressBtnComponent implements OnInit {

  @Input() button: Button;
  @Input() disabled = false;

  // Determine whether the spinner should be visible.
  // It is pertially affected the the disabled state of button:
  // if button is not disabled, spinner should never be shown;
  // if button is disabled, the visibility of spinner depends on
  // inProgress state.
  get loading(): boolean {
    if (!this.disabled) {
      return false;
    }

    return this.button.inProgress;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
