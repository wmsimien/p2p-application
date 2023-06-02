import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  displayOn: boolean = false;


  
  constructor(
    private dialog: MatDialog,
    ) {
  }

  openEmployeeForm() {
    const empDialog = this.dialog.open(EmployeeFormComponent);
    empDialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // console.log(val);    
        }
      },
      error: console.log,
    })
  }


  

  ngOnInit(): void {
   
  }


}
