import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Utility } from '../shared/utilities';

@Component({
  selector: 'app-error',
  template: '<h1 class="mat-display-1" style="text-align: center">{{ errorMsg }}</h1>',
  styles: []
})
export class ErrorComponent implements OnInit {
  errorMsg = 'Page not found';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    Utility.headerTitle.next('');
    const msg = this.route.snapshot.queryParams['msg'];
    if (msg) {
      this.errorMsg = msg;
    }
  }
}
