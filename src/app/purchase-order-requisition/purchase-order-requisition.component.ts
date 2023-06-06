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

  poreqDetail: any;
  displayedColumns: string[] = ['id', 'reqDate', 'itemId', 'itemName','itemDescription','qty', 'price', 
  'total', 'deliveryDate', 'createdDate','action'];
  // displayedColumns: string[] = ['reqNo', 'reqDate', 'itemId','item', 'itemDescription', 'qty', 'price', 'supplier', 
  // 'shipTo','deliveryDate', 'reqNotesInternal','reqNotesExternal','createdBy', 'createdDate', 'approvedBy', 'approvedDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private poReqDialog: MatDialog, 
    private poReqService: ApiUrlsService,
    ) {}

    /**
     * Method calls service to obtain a list of all purchase requisitions
     */
  getPOReqsList() {
    this.poReqService.getAllPOReqs().subscribe({
      next: (res) => {
        // console.log(res);
        console.log(res.data);
        console.log(res.data[0].poReqDetailList);
        this.poreqDetail = res.data
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
        this.getPOReqsList();
      },
      error: console.log,
    })
  }

  /**
   * Method opens purchase-order requisition form for edit.
   */
  openAddReqForm() {
    const poReqDialogRef = this.poReqDialog.open(PurchaseOrderRequisitionFormComponent);
    poReqDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
         this.getPOReqsList();
        }
      },
      error: console.log,
    });
  }

  /**
   * Method opens the purchase-order requisition form for updating.
   * @param data 
   */
  openReqForm(data: any) {
    console.log(data);
    const poReqDialogRef = this.poReqDialog.open(PurchaseOrderRequisitionFormComponent, {
      data,
    });

    poReqDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          return this.getPOReqsList();
        }
      },
      error: console.log,
    });
  
  }


  ngOnInit(): void {
      this.getPOReqsList();
  }
}
