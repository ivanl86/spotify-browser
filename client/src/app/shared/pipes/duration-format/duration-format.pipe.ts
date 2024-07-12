import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(ms: number, format: "full" | "short"): string {
    if (!ms) {
      return "";
    }

    const seconds: number = Math.floor(ms / 1000 % 60);
    const minutes: number = Math.floor(ms / 1000 / 60 % 60);
    const hours: number = Math.floor(ms / 1000 / 60 / 60);

    if (format === "full") {
      return this.fullFormat({ hr: hours, min: minutes, sec: seconds });
    } else {
      return this.shortFormat({ min: minutes, sec: seconds });
    }
  }

  private fullFormat(duration: { hr: number, min: number, sec: number }): string {
    if (duration.hr > 0) {
      return `${duration.hr} hr ${duration.min} min`;
    } else {
      return `${duration.min} min ${duration.sec} sec`;
    }
  }

  private shortFormat(duration: { min: number, sec: number }): string {
    return `${duration.min}:${duration.sec >= 10 ? duration.sec : '0' + duration.sec}`;
  }

}
