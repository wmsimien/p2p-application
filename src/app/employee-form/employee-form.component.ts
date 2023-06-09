import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiUrlsService } from '../api-urls.service';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  /**
   * Declare and initialize variables
   */
  employeeForm!: FormGroup;
  roles: string[] = ['DOA', 'Buyer', 'Staff'];
  departments: string[] = ['Corporate', 'Sales', 'Customer Support', 'Facilities', 'Procurement'];


  constructor( @Inject(MAT_DIALOG_DATA) public empData: any, private apiUrlsService: ApiUrlsService,
  private messageService: MessagingService,
  private empDialog: MatDialogRef<EmployeeFormComponent>,
  private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: '',
      lastName: '',
      department: '',
      role: '',
      email: '',
      gl_acct_no: ''
    })
  }


  onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.empData) {
        this.apiUrlsService.updateEmployeeById(this.empData.id, this.employeeForm.value).subscribe({
          next: (val: any) => {
            this.messageService.openSnackBar('Employee updated successfully.')
            this.empDialog.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        // create new employee record
        this.apiUrlsService.createEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            this.messageService.openSnackBar('Employee created successfully.')
            this.empDialog.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }

    } 
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.empData);
  }

}
