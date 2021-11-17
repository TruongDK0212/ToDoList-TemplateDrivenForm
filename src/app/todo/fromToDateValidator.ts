import { AbstractControl, FormGroup } from "@angular/forms";
import * as dayjs from "dayjs";

export function checkToDate (
    fromDateControl: string,
    toDateControl: string
) {
    return (formgroup: FormGroup) => {
        const fromDate = formgroup.controls[fromDateControl];
        const toDate = formgroup.controls[toDateControl];
        let fromDateValue = fromDate.value;
        let toDateValue = toDate.value;
        let dayFrom = dayjs(fromDateValue);
        let toFrom = dayjs(toDateValue);
        if (fromDateValue.errors && toDateValue.errors) {
            return;
        }
        if (dayFrom.diff(toFrom) >= 0) {
            return toDate.setErrors({wrongDate: true});
        }  
        toDate.setErrors(null);
        
    }
}