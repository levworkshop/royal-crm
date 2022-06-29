import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Customer, FilePath } from '../shared/types';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    customers!: Array<Customer>;
    searchFieldValue!: NgModule;
    searchTerm!: string;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getCustomersList().subscribe({
            next: (data: Array<Customer>) => { this.customers = data },
            error: (err) => console.error(err),
            complete: () => console.log(`complete`)
        })
    }

    exportCustomersData() {
        this.apiService.exportCustomers().subscribe({
            next: (data: FilePath) => {
                window.open(data.path);
            },
            error: (err) => console.error(err),
        })
    }

    findCustomer(event: KeyboardEvent) {
        // const value = event.target.value;

        if (event.code === 'Enter' && event.target) {
            // this.apiService.findCustomer().subscribe({
            //     next: (data: Array<Customer>) => { this.customers = data },
            //     error: (err) => console.error(err),
            // })
        }
    }
}
