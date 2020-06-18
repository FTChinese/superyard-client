import { Pipe, PipeTransform } from '@angular/core';
import { Cycle } from 'src/app/data/schema/enum';
import { cycles } from 'src/app/data/schema/localization';

@Pipe({
  name: 'cycle'
})
export class CyclePipe implements PipeTransform {

  transform(value: Cycle): string {
    return cycles[value];
  }

}
