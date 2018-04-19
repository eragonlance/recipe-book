import { ThemeSwitcherService } from '../services/theme-switcher.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import 'hammerjs'; //for material slide toggle gesture

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSlideToggle) slideToggle: MatSlideToggle;

  constructor(private themeSwitcherService: ThemeSwitcherService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.themeSwitcherService.appendToHead();

    if (this.themeSwitcherService.getName() === 'purpleGreen') {
      this.slideToggle.toggle();
    }

    this.cdr.detectChanges();
  }

  onSwitch(e: MatSlideToggleChange) {
    this.themeSwitcherService.setActiveTheme(e.checked ? 'purpleGreen' : 'deeppurpleAmber');
  }
}
