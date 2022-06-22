import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // inputType = 'text';

    night = true;
    items = ['orange', 'apple', 'banana'];






    isItNight() {
        return this.night;
    }

    addAnotherItem() {
        this.items.push('papaya');
    }
}
