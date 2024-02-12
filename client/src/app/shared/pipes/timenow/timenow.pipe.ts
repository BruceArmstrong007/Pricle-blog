import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timenow',
  standalone: true,
})
export class TimenowPipe implements PipeTransform {

  transform(inputDate: Date, currentDate: Date): unknown {
    if (!inputDate) {
      return '';
    }

    const timeDifference = currentDate.getTime() - inputDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  }

}
