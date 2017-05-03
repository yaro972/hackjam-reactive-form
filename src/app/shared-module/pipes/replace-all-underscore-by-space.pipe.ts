import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replaceAllUnderscoreBySpace'
})
export class ReplaceAllUnderscoreBySpacePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) {
      return '';
    }
    return value.replace(/_/g, ' ');
  }
}
