import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiUrlsService } from '../api-urls.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  supplierForm: FormGroup;

  status: string[] = ['Active','Inactive'];

  constructor(private fb: FormBuilder, 
    private apiUrls: ApiUrlsService, 
      private supplierDialogRef: MatDialogRef<SupplierFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      ) {
     this.supplierForm = this.fb.group({
      name: '',
      contactName: '',
      contactPhone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phoneNo: '',
      contactEmail: '',
      paymentMethod: '',
      status: ''
     });
  }
 
  /**
   * Method will perform update of an existing supplier record or create a new supplier record.
   */
  onFormSubmit() {
    if (this.supplierForm.valid) {
      if (this.data) {
        this.apiUrls.updateSupplierId(this.data.id, this.supplierForm.value).subscribe({
          next: (val: any) => {
            alert('Supplier update!');
            this.supplierDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.apiUrls.createSupplier(this.supplierForm.value).subscribe({
          next: (val: any) => {
            alert('Supplier added successfully.');
            this.supplierDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }   
    }
  }

  ngOnInit(): void {
      this.supplierForm.patchValue(this.data);
  }
}
