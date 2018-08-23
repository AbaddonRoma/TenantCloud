import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      return val.title.toLowerCase().includes(args.toLowerCase());
    });
  }

}
