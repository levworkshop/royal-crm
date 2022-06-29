import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CustomersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class CustomersModule { }
