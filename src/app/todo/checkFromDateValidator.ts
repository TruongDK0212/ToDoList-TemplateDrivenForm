import { AbstractControl } from "@angular/forms";
import * as dayjs from "dayjs";

export function checkFromDate(control: AbstractControl) {
    let fromMonth = control.value;
        if (fromMonth.errors) {
            return;
        }
        if (dayjs().diff(dayjs(fromMonth, "MM/DD/YYYY"), "months") !== 0) {
            return {outOfMonth: true};
        }
        return null;
}