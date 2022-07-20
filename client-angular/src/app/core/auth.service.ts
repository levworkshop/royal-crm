import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, User } from '../shared/types';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly tokenField = 'token';

    constructor(private apiService: ApiService) { }

    login(details: Login): Observable<User> {
        return this.apiService.login(details).pipe(
            tap((data: User) => {
                localStorage.setItem(this.tokenField, data.token);
                this.apiService.setToken(data.token);
            })
        )
    }

    logout() {
        localStorage.removeItem(this.tokenField);
        this.apiService.setToken('');
    }
}
