import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiUrlsService } from '../api-urls.service';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-itemfavs-form',
  templateUrl: './itemfavs-form.component.html',
  styleUrls: ['./itemfavs-form.component.css']
})
export class ItemfavsFormComponent implements OnInit{

  itemFavForm: FormGroup;

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
      private messageService: MessagingService,
      private itemFavDialogRef: MatDialogRef<ItemfavsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      ) {
     this.itemFavForm = this.fb.group({
      name: '',
      description: '',
      unitPrice: '',
      uom: ''
     });
  }

  /**
   * Method will perform update of an existing item favorite or create a new item favorite.
   */
  onFormSubmit() {
    if (this.itemFavForm.valid) {
      if (this.data) {
        this.apiUrls.updateItemFavId(this.data.id, this.itemFavForm.value).subscribe({
          next: (val: any) => {
            this.messageService.openSnackBar('Item Favorite successfully.')
            this.itemFavDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.apiUrls.createItemFavs(this.itemFavForm.value).subscribe({
          next: (val: any) => {
            this.messageService.openSnackBar('Item Favorite added successfully.')
            this.itemFavDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }   
    }
  }

  ngOnInit(): void {
      this.itemFavForm.patchValue(this.data);
  }
}
