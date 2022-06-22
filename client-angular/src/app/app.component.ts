import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Welcome';
    inputType = 'text';
    success = true;
    night = true;
    items = ['orange', 'apple', 'banana'];
    labels = ['Customers', 'Products', 'Orders'];

    getTitleClass(): string {
        return this.success ? 'text-info' : 'text-danger';
    }

    toggleTitleColor() {
        this.success = !this.success;
    }

    isItNight() {
        return this.night;
    }

    addAnotherItem() {
        this.items.push('papaya');
    }
}
