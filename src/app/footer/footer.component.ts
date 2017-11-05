import { Utility } from './../shared/utilities';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSlideToggle) slideToggle: MatSlideToggle;
  link = <HTMLLinkElement>document.querySelector('link[rel="stylesheet"]');
  isDark = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.link) {
      return;
    }

    this.link = <HTMLLinkElement>this.link.nextElementSibling;

    if (localStorage.getItem('themeSaved') === '1') {
      this.isDark = true;
      this.link.href = 'css/dark.bundle.css';
      this.primary = '#7b1fa2';
      this.accent = '#69f0ae';
    }
  }

  ngAfterViewInit() {
    if (this.isDark) {
      this.slideToggle.toggle();
    }
    this.cdr.detectChanges();
  }

  onSwitch(e: MatSlideToggleChange) {
    if (e.checked) {
      this.link.href = 'css/dark.bundle.css';
      this.primary = '#7b1fa2';
      this.accent = '#69f0ae';
      localStorage.setItem('themeSaved', '1');
    } else {
      this.link.href = 'css/light.bundle.css';
      this.primary = '#673ab7';
      this.accent = '#ffd740';
      localStorage.removeItem('themeSaved');
    }
  }

  set primary(color: string) {
    Utility.primaryColor = color;
  }
  set accent(color: string) {
    Utility.accentColor = color;
  }
}
