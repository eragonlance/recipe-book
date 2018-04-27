import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styles: []
})
export class ErrorComponent implements OnInit {
  errorMsg = '404 PAGE NOT FOUND';

  constructor() {}

  ngOnInit() {
    Utils.headerTitle.next('');
  }
}
