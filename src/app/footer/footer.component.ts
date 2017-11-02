import { Utility } from './../shared/utilities';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit {
  link = <HTMLLinkElement>document.querySelector('link[rel="stylesheet"]');

  ngOnInit() {
    this.primary = '#673ab7';
    this.accent = '#ffd740';
  }

  onSwitch(e: MatSlideToggleChange) {
    this.link.href = e.checked ? 'dark.bundle.css' : 'light.bundle.css';
    if (e.checked) {
      this.link.href = 'dark.bundle.css';
      this.primary = '#7b1fa2';
      this.accent = '#69f0ae';
    } else {
      this.link.href = 'light.bundle.css';
      this.primary = '#673ab7';
      this.accent = '#ffd740';
    }
  }

  set primary(color: string) {
    Utility.primaryColor = color;
  }
  set accent(color: string) {
    Utility.accentColor = color;
  }
}
