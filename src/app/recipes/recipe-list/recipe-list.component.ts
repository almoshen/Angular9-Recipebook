import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { PageEvent } from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = [];
  totalRecipes = 0;
  recipesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 4, 6, 8];
  subscription: Subscription;
  private authStatusSub: Subscription;
  isAuthenticated = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit() {
    this.recipeService.getRecipes(this.recipesPerPage, this.currentPage);
    this.subscription = this.recipeService.getRecipeChangeListener()
      .subscribe((recipeData: { recipes: Recipe[], recipeCount: number}) => {
        this.recipes = recipeData.recipes;
        this.totalRecipes = recipeData.recipeCount;
      });
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
      });
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.recipesPerPage = pageData.pageSize;
    this.recipeService.getRecipes(this.recipesPerPage, this.currentPage);
  }

  onDelete(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId)
      .subscribe(() => {
        this.recipeService.getRecipes(this.recipesPerPage, this.currentPage);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
