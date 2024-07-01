import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(ms: number, format: "ss" | "mm:ss"): string | undefined {

    if (!ms) {
      return undefined;
    }
    if (format === "ss") {
      return Math.floor(ms / 1000).toString();
    }

    let seconds: string = Math.floor(ms / 1000 % 60).toString();
    const minutes: string = Math.floor(ms / 1000 / 60).toString();
    seconds = seconds.length > 1 ? seconds : `0${seconds}`;

    return format.replace("mm", minutes).replace("ss", seconds);
  }

}
