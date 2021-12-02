import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

@Pipe({name: 'changeDatePipe'})
export class ChangeDatePipe implements PipeTransform {
    transform(value: string): string {
        dayjs.extend(relativeTime);
        let dateDiff = value + " ( " + dayjs(dayjs(value)).fromNow() + " )";
        return dateDiff;
    }
}


