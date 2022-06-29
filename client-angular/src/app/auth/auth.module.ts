import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ]
})
export class AuthModule { }
