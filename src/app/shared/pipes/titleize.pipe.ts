import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleize',
})
export class TitleizePipe implements PipeTransform {
  static skipWords = ['of', 'the', 'an', 'a', 'in'];

  transform(title: string, args?: string[] | boolean): string {
    console.log('in pipe', title);
    if (typeof title !== 'string') {
      return title;
    }

    const skipWords = Array.isArray(args) ? args : TitleizePipe.skipWords;
    const processSkipwords: boolean = args !== false;

    return title.replace(/\w[^-\s]*/g, (word, index: number) => {
      console.log('word is ', word, index);
      if (processSkipwords && index && skipWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }

      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }
}

