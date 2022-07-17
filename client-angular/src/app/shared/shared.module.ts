import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { PhonePipe } from './pipes/phone.pipe';
import { NotificationComponent } from './notification/notification.component';
import { ExportComponent } from './export/export.component';

@NgModule({
    declarations: [
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        PhonePipe,
        NotificationComponent,
        ExportComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        PhonePipe,
        NotificationComponent,
        ExportComponent,
    ]
})
export class SharedModule { }
