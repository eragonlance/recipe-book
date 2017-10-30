import { Utility } from './../shared/utilities';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.styl']
})
export class RecipesComponent implements OnInit {
  ngOnInit() {
    Utility.headerTitle.next('Recipes');
  }
}
