import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {

    transform(value?: string): string {
        if (!value || !value.includes('-')) {
            return '';
        }

        //02-3330000
        // (02) 3330000
        const number = value.split('-');
        return `(${number[0]}) ${number[1]}`;
    }
}
