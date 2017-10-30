import { Observable } from 'rxjs/Observable';
import { RecipeEditComponent } from './recipe-edit.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class RecipeEditDeactivate implements CanDeactivate<RecipeEditComponent> {
  canDeactivate(
    component: RecipeEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}
