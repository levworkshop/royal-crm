import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.emailField.nativeElement.focus();
    }

    onSumbit() {
        console.log(this.loginForm.value);
        console.log(this.loginForm.valid);
    }

}
