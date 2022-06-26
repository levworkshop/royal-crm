import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from './services/session.service';

@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        CustomersComponent,
        ProductsComponent,
        OrdersComponent,
        SignupComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
