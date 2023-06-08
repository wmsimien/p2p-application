import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {



  constructor(private snackBar: MatSnackBar) { }

  /**
   * Create a service for displaying snack-bar notifications using MatSnackBar.  
   * Message will be open/dislay for a second toward the top view.
   * @param message  Opens snackbar with provided message.
   * @param action   Action to perform with message.
   */
  openSnackBar(message: string, action: string='ok') {
    this.snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
}
