import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {

    transform(value?: string): string {
        if (!value) {
            return '';
        }

        // format phone number with structure 02333333 0522222222
        if (!value.includes('-')) {
            if (value.length === 9) { // land line 
                return `(${value.substring(0, 2)}) ${value.substring(2, 9)}`;
            }
            else { // mobile
                return `(${value.substring(0, 3)}) ${value.substring(4, 10)}`;
            }
        }

        // 02-3330000
        const number = value.split('-');
        return `(${number[0]}) ${number[1]}`;
    }
}
