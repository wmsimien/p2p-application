import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EmployeesComponent } from './employees/employees.component';
import { HttpClientModule } from '@angular/common/http';


// MAT Section  :  import { MaterialUiModule } from './material-ui/material-ui.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ItemfavsComponent } from './itemfavs/itemfavs.component';
import { ItemfavsFormComponent } from './itemfavs-form/itemfavs-form.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { PurchaseOrderRequisitionComponent } from './purchase-order-requisition/purchase-order-requisition.component';
import { PurchaseOrderRequisitionFormComponent } from './purchase-order-requisition-form/purchase-order-requisition-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    ItemfavsComponent,
    ItemfavsFormComponent,
    SupplierComponent,
    SupplierFormComponent,
    PurchaseOrderRequisitionComponent,
    PurchaseOrderRequisitionFormComponent
  ],
  imports: [
    BrowserModule,MatNativeDateModule,
    AppRoutingModule,MatDatepickerModule,
    BrowserAnimationsModule,HttpClientModule,
    MatToolbarModule,MatButtonModule, MatIconModule, MatTableModule,
    ReactiveFormsModule,MatFormFieldModule,MatPaginatorModule,MatSortModule,MatDialogModule,
    MatSelectModule, MatInputModule, MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
