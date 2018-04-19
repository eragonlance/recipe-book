import { ThemeSwitcherService } from '../services/theme-switcher.service';
import { Utility } from './../shared/utilities';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  constructor(public themeSwitcherService: ThemeSwitcherService) {}

  ngOnInit() {
    Utility.headerTitle.next('home');
  }
}
