import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(n: number): number[] {
    return [...Array(n).keys()];
  }
}
