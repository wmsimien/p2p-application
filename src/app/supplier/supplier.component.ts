import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from '../api-urls.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  displayedColumns: string[] = ['id','name','contactName','contactPhone',
  // 'address','city','state','zip',
  'contactEmail','status','phoneNo','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private supplierDialog: MatDialog, 
    private supplierService: ApiUrlsService,
    ) {}

    /**
     * Method calls service to obtain a list of all item favorites
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
   * Method calls a service to delete the current item favorite on the current row.
   * @param id Item favorite id to delete
   */
  deleteSupplier(id: number) {
    this.supplierService.deleteSupplierId(id).subscribe({
      next: (res) => {
        alert('Supplier deleted!');
        this.getSupplierList();
      },
      error: console.log,
    })
  }

  /**
   * Method opens item favorite form to edit a item favorite.
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
   * Method opens the item favorite form for adding a new item favorite.
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
