import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(input: string): any {
    if (!input) {
      return '';
    }

    return input[0].toUpperCase() + input.substr(1).toLowerCase();
  }

}
