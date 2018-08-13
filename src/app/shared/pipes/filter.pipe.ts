import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchingText: string): any[] {
    if (!items) { return []; }
    if (!searchingText) { return items; }
    searchingText = searchingText.toLowerCase();
    return items.filter(bike => {
      return bike.title.toLowerCase().includes(searchingText);
    });
  }
}

