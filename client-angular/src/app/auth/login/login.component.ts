import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    @ViewChild('emailField') emailField!: ElementRef;

    loginForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email]
        }),
        password: new FormControl('', {
            validators: Validators.required
        }),
    });

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.emailField.nativeElement.focus();
    }

    onSubmit() {
        // console.log(this.loginForm.value);
        // console.log(this.loginForm.valid);

        if (!this.loginForm.valid) {
            return;
        }

        this.authService.login(this.loginForm.value).subscribe({
            error: (err) => console.error(err)
        })
    }

}
