import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ]
})
export class AppMaterialModule {}
