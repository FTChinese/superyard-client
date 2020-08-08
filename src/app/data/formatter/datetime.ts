// Add seconds part if a time only have hour and minute.
export function normalizeTime(time: string): string {
  const parts = time.split(':');

  if (parts.length >= 3) {
    return parts.slice(0, 3).join(':');
  }

  for (let i = 0; i < 3; i++) {
    if (!parts[i]) {
      parts[i] = '00';
    }
  }

  return parts.join(':');
}

export interface DateTime {
  date: string;
  time: string;
}

export function concateISODateTime(dtz: DateTime & { zone: string }): string {
  return `${dtz.date}T${normalizeTime(dtz.time)}${dtz.zone}`;
}

export function isoOffset(date: Date): string {
  const offset = date.getTimezoneOffset();
  if (offset === 0) {
    return 'Z';
  }

  const sign = offset <= 0
    ? '+'
    : '-';

  const hour = Math.floor(Math.abs(offset) / 60).toFixed();
  const minute = Math.abs(offset % 60).toFixed();

  return `${sign}${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}

function padZero(num: number): string {
  return num.toFixed().padStart(2, '0');
}

export function toISOTimeLocal(date: Date): string {
  return [
    padZero(date.getHours()),
    padZero(date.getMinutes()),
    padZero(date.getSeconds())
  ]
    .join(':') + isoOffset(date);
}

export function toISODatetimeLocal(date: Date): string {
  return [
    date.getFullYear(),
    padZero(date.getMonth() + 1),
    padZero(date.getDate()),
  ]
    .join('-') + `T${toISOTimeLocal(date)}`;
}

export function toISOTimeUtc(date: Date): string {
  return [
    padZero(date.getUTCHours()),
    padZero(date.getUTCMinutes()),
    padZero(date.getUTCSeconds())
  ]
    .join(':');
}

export function toISODatetimeUtc(date: Date): string {
  return [
    `${date.getUTCFullYear()}`,
    padZero(date.getUTCMonth() + 1),
    padZero(date.getUTCDate())
  ]
    .join('-') + `T${toISOTimeUtc(date)}Z`;
}
