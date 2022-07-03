import { Component, NgModule, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { Customer, FilePath } from '../shared/types';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    customers!: Array<Customer>;
    searchFieldValue!: string;
    searchTerm!: string;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers() {
        this.apiService.getCustomersList().subscribe({
            next: (data: Array<Customer>) => { this.customers = data },
            error: (err) => console.error(err),
            // complete: () => console.log(`complete`)
        })
    }

    customersTotal(): number {
        return this.customers ? this.customers.length : 0;
    }

    exportCustomersData() {
        this.apiService.exportCustomers().subscribe({
            next: (data: FilePath) => {
                window.open(`${environment.serverUrl}/${data.name}`);
            },
            error: (err) => console.error(err),
        })
    }

    findCustomer(event: KeyboardEvent) {
        const value = this.searchFieldValue;

        if (event.key === 'Enter' && value.length >= 3) {
            this.apiService.findCustomer(value).subscribe({
                next: (data: Array<Customer>) => { this.customers = data },
                error: (err) => console.error(err),
            })
        }
    }

    clearSearch() {
        this.searchFieldValue = '';
        this.getCustomers();
    }
}
