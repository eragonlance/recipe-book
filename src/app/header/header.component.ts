import { BackendService } from '../shared/backend.service';
import { Utility } from './../shared/utilities';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerTitle = '';
  headerTitleSub: Subscription;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.headerTitleSub = Utility.headerTitle.subscribe((headerTitle: string) => (this.headerTitle = headerTitle));
  }

  onSaveData() {
    this.backendService.saveRecipes();
  }

  onFetchData() {
    this.backendService.fetchRecipes();
  }

  ngOnDestroy() {
    this.headerTitleSub.unsubscribe();
  }
}
