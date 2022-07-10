import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        CustomersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ]
})
export class CustomersModule { }
