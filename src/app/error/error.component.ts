import { Component, OnInit } from '@angular/core';
import { Utility } from '../shared/utilities';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styles: []
})
export class ErrorComponent implements OnInit {
  errorMsg = '404 PAGE NOT FOUND';

  constructor() {}

  ngOnInit() {
    Utility.headerTitle.next('');
  }
}
