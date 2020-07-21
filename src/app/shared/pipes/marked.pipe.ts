import { Pipe, PipeTransform } from '@angular/core';
import { Marked } from '@ts-stack/markdown';

@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length > 0) {
      return Marked.parse(value);
    }

    return value;
  }

}
