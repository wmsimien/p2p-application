import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiUrlsService } from '../api-urls.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-order-requisition-form',
  templateUrl: './purchase-order-requisition-form.component.html',
  styleUrls: ['./purchase-order-requisition-form.component.css']
})
export class PurchaseOrderRequisitionFormComponent {

  poReqsForm: FormGroup;
  poreqDetail: any;

  
  uoms: string[] = [
    'Each',
    'Box(es)',
    'Dozen(s)',
    'Pound(s)',
    'Skid(s)',
    'Gallon(s)'
  ];

  constructor(private fb: FormBuilder, 
    private apiUrls: ApiUrlsService, 
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
     
     });

  }

  /**
   * Method will perform update of an existing purchase requisition or create one.
   * console.log(res.data);
        console.log(res.data[0].poReqDetailList);
        this.poreqDetail = res.data[0].poReqDetailList;
        testData:data.poReqDetailList[0].items[0].id
   */
  onFormSubmit() {
    console.log(this.poReqsForm);
    if (this.poReqsForm.valid) {
      console.log(this.data);
      if (this.data) {
        console.log(this.data);
        this.apiUrls.updatePOReqById(this.data.id, this.poReqsForm.value).subscribe({
          next: (val: any) => {
            alert('PO-Reqs update!');
            this.poReqsDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.apiUrls.createItemFavs(this.poReqsForm.value).subscribe({
          next: (val: any) => {
            alert('PO-Reqs added successfully.');
            this.poReqsDialogRef.close(true);
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
