import { Pipe, PipeTransform, Testability } from '@angular/core';

@Pipe({
  name: 'line'
})
export class LinePipe implements PipeTransform {

  transform(text: string | null): string[] {
    if (!text) {
      return [];
    }

    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
  }

}
