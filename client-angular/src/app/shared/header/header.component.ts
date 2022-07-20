import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    brandName = 'Royal CRM';
    userName = 'john';
    today = new Date();

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login-component']);
    }

}
