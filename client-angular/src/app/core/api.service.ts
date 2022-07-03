import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, FilePath } from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getCustomersList(): Observable<Array<Customer>> {
        return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers`);
    }

    exportCustomers(): Observable<FilePath> {
        return this.http.get<FilePath>(`${environment.serverUrl}/customers/export`);
    }

    findCustomer(searchTerm: string): Observable<Array<Customer>> {
        return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers/find?param=${searchTerm}`)
    }
}
