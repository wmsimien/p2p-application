import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiUrlsService } from '../api-urls.service';
import { ItemfavsFormComponent } from '../itemfavs-form/itemfavs-form.component';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-itemfavs',
  templateUrl: './itemfavs.component.html',
  styleUrls: ['./itemfavs.component.css']
})
export class ItemfavsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'unitPrice', 'uom', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private itemFavDialog: MatDialog, 
    private itemFavService: ApiUrlsService,
    private messageService: MessagingService,
    ) {}

    /**
     * Method calls service to obtain a list of all item favorites
     */
  getItemList() {
    this.itemFavService.getAllItemFavs().subscribe({
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
  deleteItemFav(id: number) {
    this.itemFavService.deleteItemFavId(id).subscribe({
      next: (res) => {
        this.messageService.openSnackBar('Item Fav deleted.');
        this.getItemList();
      },
      error: console.log,
    })
  }

  /**
   * Method opens item favorite form to edit a item favorite.
   */
  openAddItemFavForm() {
    const itemFavDialogRef = this.itemFavDialog.open(ItemfavsFormComponent);
    itemFavDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
         this.getItemList();
        }
      },
      error: console.log,
    });
  }

  /**
   * Method opens the item favorite form for adding a new item favorite.
   * @param data 
   */
  openItemFavsForm(data: any) {
    const itemFavDialogRef = this.itemFavDialog.open(ItemfavsFormComponent, {
      data,
    });

    itemFavDialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          return this.getItemList();
        }
      },
      error: console.log,
    });
  
  }


  ngOnInit(): void {
      this.getItemList();
  }
}
