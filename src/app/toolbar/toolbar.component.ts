import { Component, OnInit } from '@angular/core';
import { ApiUrlsService } from '../api-urls.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  displayOn: boolean = false;
  urlPath: string = '';


  constructor(private apiUrl: ApiUrlsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,) {
  }

  openEmployeeForm() {
    const empDialog = this.dialog.open(EmployeeFormComponent);
    empDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val);
          // return this.getEmployeeList();
        }
      },
      error: console.log,
    })
  }

  


  ngOnInit(): void {
   
    this.route.url.subscribe((res) =>
    console.log(res[0].path)
      // this.path = res[0].path
    )
  }


}
