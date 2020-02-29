import { DateTime } from 'luxon';

console.log(DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true}));

console.log(DateTime.fromISO('2016-05-25T09:08:34Z', {setZone: true}));
