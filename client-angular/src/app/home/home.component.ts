import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    title = 'Welcome';
    labels = ['Customers', 'Products', 'Orders'];
    success = true;

    constructor() { }

    ngOnInit(): void {
    }

    getTitleClass(): string {
        return this.success ? 'text-info' : 'text-danger';
    }
    toggleTitleColor() {
        this.success = !this.success;
    }

}
