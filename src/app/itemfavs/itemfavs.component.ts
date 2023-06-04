import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
// import { EmployeeService } from '../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import { CoreService } from '../core/core.service';
import { ApiUrlsService } from '../api-urls.service';

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

  constructor(private dialog: MatDialog, 
    private itemFavService: ApiUrlsService,
    // private coreService: CoreService
    ) {}

  // openAddEditEmpForm() {
  //   const dialogRef = this.dialog.open(EmpAddEditComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if(val) {
  //         return this.getEmployeeList();
  //       }
  //     },
  //     error: console.log,
  //   })
  // }

  getItemList() {
    this.itemFavService.getAllFavItems().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:  console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    // this.empService.deleteEmployee(id).subscribe({
      // next: (res) => {
        // alert('Employee deleted!');
        // this.coreService.openSnackBar('Employee deleted!', 'done')
        // this.getEmployeeList();
      // },
      // error: console.log,
    // })
  }

  openEditEmpForm(data: any) {
    // const dialogRef = this.dialog.open(EmpAddEditComponent, {
      // data,
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if(val) {
    //       return this.getEmployeeList();
    //     }
    //   },
    //   error: console.log,
    // })
  
  }


  ngOnInit(): void {
      this.getItemList();
  }
}
