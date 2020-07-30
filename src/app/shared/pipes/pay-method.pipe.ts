import { Pipe, PipeTransform } from '@angular/core';
import { paymentMethods } from 'src/app/data/schema/localization';
import { PaymentMethod } from 'src/app/data/schema/enum';

@Pipe({
  name: 'payMethod'
})
export class PayMethodPipe implements PipeTransform {

  transform(value: PaymentMethod): string {
    return paymentMethods[value];
  }

}
