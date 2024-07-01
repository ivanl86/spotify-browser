import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(str: string): string {
    if (!str) {
      return "";
    }
    if (!str.charAt(0).match(/^[a-z]+$/) ) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

}
