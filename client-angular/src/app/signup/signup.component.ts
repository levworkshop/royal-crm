import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm = new FormGroup({
        firstName: new FormControl('default value'),
        lastName: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        retypePassword: new FormControl(''),
    });

    constructor() {

    }

    ngOnInit(): void {
    }

    onSubmit() {
        console.log(this.signupForm.value);
    }

}
