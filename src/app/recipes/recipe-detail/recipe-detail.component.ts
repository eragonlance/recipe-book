import {
  ActivatedRoute,
  Params,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input, Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.styl']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  onDeleteRcipe() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: 'Delete',
        content: 'Do you want to delete ' + this.recipe.name + ' recipe?'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.recipeService.removeRecipe(this.recipe);
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
