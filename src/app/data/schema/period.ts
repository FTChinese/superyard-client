import { DateTime, concatISODateTime } from '../formatter/datetime';

// Period defines a range of time.
export interface Period {
  startUtc: string;
  endUtc: string;
}

// FormPeriod defines the structure of datetime entered in a form.
// The input control has date and time type separately, therefore
// we ask user to enter date and time in separate input and concatenate
// theme together with browser's timezone.
export interface FormPeriod {
  startUtc: DateTime;
  endUtc: DateTime;
}

// Turn data submitted by a form to Period type.
export function buildPeriod(p: FormPeriod & { zone: string }): Period {
  return {
    startUtc: concatISODateTime({
      ...p.startUtc,
      zone: p.zone
    }),
    endUtc: concatISODateTime({
      ...p.endUtc,
      zone: p.zone
    })
  };
}
