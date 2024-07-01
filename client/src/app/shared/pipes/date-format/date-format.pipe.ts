import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: string | undefined, format: string): string {
    if (!date) {
      return "";
    }

    const [ year, month, day ] = date.split('-');
    let formattedDate: string = format;

    formattedDate = formattedDate.replace('y', year);
    formattedDate = formattedDate.replace('m', month);
    formattedDate = formattedDate.replace('d', day);

    return formattedDate;
  }

}
