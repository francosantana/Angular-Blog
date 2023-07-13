import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; 

@Pipe({
  name: 'now',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return moment(value, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow();
  }

}
