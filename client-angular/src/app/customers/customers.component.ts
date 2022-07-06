import { Component, NgModule, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { Customer, CustomerSort, FilePath, sortColumn } from '../shared/types';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    customers!: Array<Customer>;
    searchFieldValue!: string;
    searchTerm!: string;
    tableSort!: CustomerSort;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.getCustomers();

        this.tableSort = {
            column: 'name',
            dirAsc: true
        };
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

    sortCustomers(column: sortColumn) {
        if (this.tableSort.column === column) {
            this.tableSort.dirAsc = !this.tableSort.dirAsc;
        }
        else {
            this.tableSort.column = column;
            this.tableSort.dirAsc = true;
        }

        const direction = this.tableSort.dirAsc ? 'ASC' : 'DESC';

        this.apiService.getSortedCustomers(column, direction).subscribe({
            next: (data: Array<Customer>) => { this.customers = data },
            error: (err) => console.error(err)
        })
    }

    displaySort(column: sortColumn): string {
        if (this.tableSort.column === column) {
            return this.tableSort.dirAsc ? 'bi-chevron-up' : 'bi-chevron-down';
        }
        return 'bi-chevron-expand';
    }
}
