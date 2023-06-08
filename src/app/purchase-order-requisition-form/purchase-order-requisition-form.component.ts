import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiUrlsService } from '../api-urls.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-purchase-order-requisition-form',
  templateUrl: './purchase-order-requisition-form.component.html',
  styleUrls: ['./purchase-order-requisition-form.component.css']
})
export class PurchaseOrderRequisitionFormComponent {

  poReqsForm: FormGroup;
  poreqDetail: any;
  poReqDetailList: any;

  
  uoms: string[] = [
    'Each',
    'Box(es)',
    'Dozen(s)',
    'Pound(s)',
    'Skid(s)',
    'Gallon(s)'
  ];
// picker: any;

  constructor(private fb: FormBuilder, 
    private apiUrls: ApiUrlsService, 
    private messageService: MessagingService,
      private poReqsDialogRef: MatDialogRef<PurchaseOrderRequisitionFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      ) {
     this.poReqsForm = this.fb.group({
      id: '',
      reqDate: '',
      shipTo: '',
      itemId: '',
      itemName: '',
      itemDescription: '',
      qty: '',
      price: '',
      uom: '',
      total: '',
      supplier: '',
      deliveryDate: '',
      reqNotesInternal: '',
      reqNotesExternal: '',
      createdBy: '',
      createdDate: '',
      approvedBy: '',
      approvedDate: '',
      paymentTerms: '',
      poReqDetailList:'',
     
     });

  }


  /**
   * Method will perform update of an existing purchase requisition or create one.
   */
  onFormSubmit() {
    if (this.poReqsForm.valid) {
      if (this.data) {
        console.log(this.data);
        console.log(this.poReqsForm.value);
        this.apiUrls.updatePOReqById(this.data.id, this.poReqsForm.value).subscribe({
          next: (val: any) => {
            this.messageService.openSnackBar('PO-Reqs Header update!');
            this.apiUrls.updatePOReqDetail(this.data.id, this.poReqsForm.value).subscribe({
              next: (val: any) => {
                console.log(val);
                this.poReqsDialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              }
            });
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.apiUrls.createPOReqHeader(this.poReqsForm.value).subscribe({
          next: (val: any) => {
            this.messageService.openSnackBar('PO-Reqs added successfully.');
            this.apiUrls.createPOReqDetail(this.data.id, this.poReqsForm.value).subscribe({
              next: (val: any) => {
                this.poReqsDialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              }
            });
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }   
    }
  }

  ngOnInit(): void {
      this.poReqsForm.patchValue(this.data);

  }
  
}
