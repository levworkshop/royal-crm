import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    { path: 'home-component', component: HomeComponent },
    { path: 'customers-component', component: CustomersComponent },
    { path: 'products-component', component: ProductsComponent },
    { path: 'orders-component', component: OrdersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

/*
1. Add routing to the application (CLI)
2. Create new components - 1 component for each page (ng g component ...)
3. Map between link path and page component (app-routing.module.ts)
4. add routerLink in a template (app.component, header.component, etc...)
5. add <router-outlet></router-outlet> in the template
*/
