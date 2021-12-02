import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from 'dayjs';

@Pipe({name: 'toDatePipe'})
export class toDatePipe implements PipeTransform {
    transform(value: string): string {
        let dateDiff: number=0;
        let dateStr: string = '';
        if (dayjs().diff(dayjs(value, "MM/DD/YYYY"), "ms") < 0) {
            dateStr = value;
        }
        else if (dayjs().diff(dayjs(value, "MM/DD/YYYY"), "minutes") <= 60) {
            dateDiff = dayjs().diff(dayjs(value, "MM/DD/YYYY"), "minutes");
            dateStr = value + " (" + dateDiff.toString() + " minutes overdue)";
        } else if (dayjs().diff(dayjs(value, "MM/DD/YYYY"), "hours") <= 24) {
            dateDiff = dayjs().diff(dayjs(value, "MM/DD/YYYY"), "hours");
            dateStr = value + " (" + dateDiff.toString() + " hours overdue)";
        } else if (dayjs().diff(dayjs(value, "MM/DD/YYYY"), "days") <= 30) {
            dateDiff = dayjs().diff(dayjs(value, "MM/DD/YYYY"), "days");
            dateStr = value + " (" + dateDiff.toString() + " days overdue)";
        } else {
            dateDiff = dayjs().diff(dayjs(value, "MM/DD/YYYY"), "months");
            dateStr = value + " (" + dateDiff.toString() + "months overdue)";
        }
        return dateStr;
    }
}