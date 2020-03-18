import { DateTime } from 'luxon';

export function isoNow(): string {
  return DateTime.utc().toISO({ suppressMilliseconds: true })
}
