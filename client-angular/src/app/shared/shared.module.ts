import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
