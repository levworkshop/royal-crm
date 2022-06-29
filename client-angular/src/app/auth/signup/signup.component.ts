import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

    @ViewChild('first') firstField!: ElementRef;

    signupForm = new FormGroup({
        firstName: new FormControl('', {
            validators: Validators.required
        }),
        lastName: new FormControl('', {
            validators: Validators.required
        }),
        email: new FormControl('', {
            validators: [Validators.required, Validators.email]
        }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)]
        }),
        retypePassword: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)]
        }),
    });

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.firstField.nativeElement.focus();
    }

    validateData(): boolean {
        if (!this.signupForm.valid) {
            return false;
        }

        const password = this.signupForm.get('password');
        const retypePassword = this.signupForm.get('retypePassword');

        if (!password || !retypePassword ||
            password.value !== retypePassword.value
        ) {
            return false;
        }

        return true;
    }

    onSubmit() {
        console.log(this.signupForm.value);
        console.log(this.validateData());

        if (!this.validateData()) {
            return;
        }
    }

}
