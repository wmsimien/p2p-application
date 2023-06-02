import { Component, OnInit } from '@angular/core';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit{

  constructor(private empService: EmpServiceService) {

  }

  getEmployeeList() {
    this.empService.findAllEmployees().subscribe({
      next: (res) => {
        console.log(res);
    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
      },
      error:  console.log,
    })
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

}
