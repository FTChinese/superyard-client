import {
  DynamicControl,
  InputControl,
  RowControl
} from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';

// Two controls to hold date and time value.
const datetimeControls: DynamicControl[] = [
  // Value format: 2020-08-06T00:00
  new InputControl({
    value: '',
    key: 'date',
    validators: [
      Validators.required,
    ],
    label: 'Date',
    type: 'date',
  }),
  new InputControl({
    value: '00:00:00',
    key: 'time',
    label: 'Start Time',
    type: 'time',
  }),
];

// Nested group controls for start datetime and end datetime.
export const periodControls: DynamicControl[] = [
  new RowControl({
    key: 'startUtc',
    label: 'Start Datetime',
    controls: datetimeControls
  }),
  new RowControl({
    key: 'endUtc',
    label: 'End Datetime',
    controls: datetimeControls
  })
];


