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
            validators: Validators.required,
        }),
        lastName: new FormControl('', {
            validators: Validators.required
        }),
        email: new FormControl('', {
            validators: Validators.email
        }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)]
        }),
        retypePassword: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)]
        }),
    });

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.firstField.nativeElement.focus();
    }

    onSubmit() {
        console.log(this.signupForm.value);
        console.log(this.signupForm.valid);
    }

}
