import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from '../api-urls.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  displayedColumns: string[] = ['id','name','contactName','contactPhone','contactEmail','status','phoneNo','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private supplierDialog: MatDialog, 
    private messageService: MessagingService,
    private supplierService: ApiUrlsService,
    ) {}

    /**
     * Method calls service to obtain a list of all suppliers
     */
  getSupplierList() {
    this.supplierService.getAllSuppliers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:  console.log,
    });
  }

  /**
   * Method calls a service to delete the current supplier record on the current row.
   * @param id Supplier Id to remove/delete
   */
  deleteSupplier(id: number) {
    this.supplierService.deleteSupplierId(id).subscribe({
      next: (res) => {
        this.messageService.openSnackBar('Supplier deleted!')
        this.getSupplierList();
      },
      error: console.log,
    })
  }

  /**
   * Method opens supplier form for edit or creating a new supplier.
   */
  openAddSupplierForm() {
    const supplierDialogRef = this.supplierDialog.open(SupplierFormComponent);
    supplierDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
         this.getSupplierList();
        }
      },
      error: console.log,
    });
  }

  /**
   * Method opens the supplier form for adding or edit a supplier record.
   * @param data 
   */
  openSupplierForm(data: any) {
    const supplierDialogRef = this.supplierDialog.open(SupplierFormComponent, {
      data,
    });
    supplierDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          return this.getSupplierList();
        }
      },
      error: console.log,
    });
  
  }


  ngOnInit(): void {
      this.getSupplierList();
  }
}
