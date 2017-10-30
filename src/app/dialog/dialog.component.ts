import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.styl']
})
export class DialogComponent implements OnInit {
  dialType = 'confirm';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; content: string; dialType: string }) {
    if (data.dialType) {
      this.dialType = data.dialType;
    }
  }

  ngOnInit() {}
}
