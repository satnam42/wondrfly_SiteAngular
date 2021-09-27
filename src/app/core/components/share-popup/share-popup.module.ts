import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharePopupComponent } from './share-popup.component';



@NgModule({
  declarations: [SharePopupComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports:[SharePopupComponent]
})
export class sharePopupModule { }
