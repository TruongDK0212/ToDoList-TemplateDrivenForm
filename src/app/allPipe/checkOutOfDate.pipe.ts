import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'checkOutOfDate'})
export class checkOutOfDate implements PipeTransform {
    transform(value: boolean): string {
        let checkDone: string = '';
        if (value === true) {
            checkDone = 'Done';
        } else {
            checkDone = 'Not Done';
        }        
        return checkDone;
    }
}