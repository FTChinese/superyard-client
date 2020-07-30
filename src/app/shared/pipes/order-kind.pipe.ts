import { Pipe, PipeTransform } from '@angular/core';
import { OrderKind } from 'src/app/data/schema/enum';
import { orderKinds } from 'src/app/data/schema/localization';

@Pipe({
  name: 'orderKind'
})
export class OrderKindPipe implements PipeTransform {

  transform(value: OrderKind): string {
    return orderKinds[value];
  }

}
