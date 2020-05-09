import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroceryListService} from './grocery-list.service';
import {Ingredient} from '../shared/ingredient.model';
import {Subscription} from 'rxjs';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {Recipe} from "../recipes/recipe.model";

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss'],
  providers: [RecipeService]
})
export class GroceryListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  mode: boolean;
  private subscription: Subscription;
  private userId: string;
  isAuthenticated: boolean;
  private authStatusSub: Subscription;

  constructor(private groceryListService: GroceryListService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
        this.userId = this.authService.getUserId();
      });
    this.ingredients = this.groceryListService.getIngredients();
    console.log(this.ingredients.length);
    if (this.ingredients.length !== 0) {
      this.mode = true;
    } else {
      this.mode = false;
    }
    // this.subscription = this.groceryListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    this.subscription = this.groceryListService.getRecipeChangeListener()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onEditItem(index) {
    this.groceryListService.startedEditing.next(index);
  }

  onEditList() {
    this.groceryListService.updateGroceryList(this.ingredients);
  }

  onSaveList() {
    console.log(this.ingredients);
    this.groceryListService.addGroceryList(this.ingredients);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
