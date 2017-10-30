import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatMenuModule, MatListModule, MatInputModule, MatToolbarModule, MatDialogModule],
  exports: [MatCardModule, MatButtonModule, MatMenuModule, MatListModule, MatInputModule, MatToolbarModule, MatDialogModule]
})
export class MaterialModule {}
