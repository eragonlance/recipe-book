import { ActivatedRoute, Data, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
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
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
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
      if (res) {
        this.recipeService.removeRecipe(this.recipe);
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
