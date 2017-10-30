import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], match: string, propName: string, caseInsensitive = true): any[] {
    return caseInsensitive
      ? value.filter(x => x[propName].toLowerCase().includes(match.toLowerCase()))
      : value.filter(x => x[propName].includes(match));
  }
}
