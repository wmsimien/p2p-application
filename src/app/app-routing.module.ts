import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ItemfavsComponent } from './itemfavs/itemfavs.component';
import { SupplierComponent } from './supplier/supplier.component';
import { PurchaseOrderRequisitionComponent } from './purchase-order-requisition/purchase-order-requisition.component';



const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent
  },
  {
    path: 'itemFavs',
    component: ItemfavsComponent
  },
  {
    path: 'supplier',
    component: SupplierComponent
  },
  {
    path:'purchase-reqs',
    component: PurchaseOrderRequisitionComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
