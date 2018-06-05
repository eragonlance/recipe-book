import { Component, OnInit } from '@angular/core';

import { ThemeSwitcherService } from 'app/services';
import { Utils } from 'app/shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  constructor(public themeSwitcherService: ThemeSwitcherService) {}

  ngOnInit() {
    Utils.headerTitle.next('home');
  }
}
