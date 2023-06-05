import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiUrlsService } from '../api-urls.service';
import { MatSort } from '@angular/material/sort';
import { PurchaseOrderRequisitionFormComponent } from '../purchase-order-requisition-form/purchase-order-requisition-form.component';

@Component({
  selector: 'app-purchase-order-requisition',
  templateUrl: './purchase-order-requisition.component.html',
  styleUrls: ['./purchase-order-requisition.component.css']
})
export class PurchaseOrderRequisitionComponent {

  displayedColumns: string[] = ['id', 'reqDate', 'itemId', 'itemName','qty', 'price', 'supplier', 
  'shipTo','deliveryDate', 'reqNotesInternal','reqNotesExternal','createdBy', 'createdDate','action'];
  // displayedColumns: string[] = ['reqNo', 'reqDate', 'itemId','item', 'itemDescription', 'qty', 'price', 'supplier', 
  // 'shipTo','deliveryDate', 'reqNotesInternal','reqNotesExternal','createdBy', 'createdDate', 'approvedBy', 'approvedDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private poReqDialog: MatDialog, 
    private poReqService: ApiUrlsService,
    ) {}

    /**
     * Method calls service to obtain a list of all item favorites
     */
  getPOList() {
    this.poReqService.getAllPurchaseOrders().subscribe({
      next: (res) => {
        console.log(res.data);
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
  deleteItemFav(id: number) {
    this.poReqService.deleteItemFavId(id).subscribe({
      next: (res) => {
        alert('Item Fav deleted!');
        this.getPOList();
      },
      error: console.log,
    })
  }

  /**
   * Method opens item favorite form to edit a item favorite.
   */
  openAddReqForm() {
    const poReqDialogRef = this.poReqDialog.open(PurchaseOrderRequisitionFormComponent);
    poReqDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
         this.getPOList();
        }
      },
      error: console.log,
    });
  }

  /**
   * Method opens the item favorite form for adding a new item favorite.
   * @param data 
   */
  openReqForm(data: any) {
    const poReqDialogRef = this.poReqDialog.open(PurchaseOrderRequisitionFormComponent, {
      data,
    });

    poReqDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          return this.getPOList();
        }
      },
      error: console.log,
    });
  
  }


  ngOnInit(): void {
      this.getPOList();
  }
}
