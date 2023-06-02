import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiUrlsService } from '../api-urls.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component'


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'department', 'role', 'email', 'gl_acct_no', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiUrls: ApiUrlsService,
    private dialog: MatDialog,
    ) {
  }

  openEmployeeForm() {
    const empDialog = this.dialog.open(EmployeeFormComponent);
    empDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          return this.getEmployeeList();
        }
      },
      error: console.log,
    })
  }

  openEmployeeFormForEdit(data: any) {
    const empDialog = this.dialog.open(EmployeeFormComponent, {
      data,
    });

    empDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          return this.getEmployeeList();
        }
      },
      error: console.log,
    })
  }

  getEmployeeList() {
    this.apiUrls.getAllEmployees().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:  console.log,
    })
  }


  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  ngOnInit(): void {
    this.getEmployeeList();
  
  }
}
