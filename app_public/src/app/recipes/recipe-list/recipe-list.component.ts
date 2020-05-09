import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { PageEvent } from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';
import {HeaderService} from '../../header/header.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  totalRecipes = 0;
  recipesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 4, 6, 8];
  subscription: Subscription;
  private authStatusSub: Subscription;
  private filterSub: Subscription;
  isAuthenticated = false;
  userId: string;
  username: string;
  visible = false;
  searchValue;
  filterData: Recipe[];

  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private headerService: HeaderService) {}

  ngOnInit() {
    this.recipeService.getRecipes(this.recipesPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUsername();
    this.subscription = this.recipeService.getRecipeChangeListener()
      .subscribe((recipeData: { recipes: Recipe[], recipeCount: number}) => {
        this.recipes = recipeData.recipes;
        this.totalRecipes = recipeData.recipeCount;
      });
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
        this.userId = this.authService.getUserId();
        this.username = this.authService.getUsername();
      });
    this.visible = this.headerService.getFilterStatus();
    this.filterSub = this.headerService.getFilterStatusListener()
      .subscribe(filtered => {
        this.visible = filtered;
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

  search(term: string) {
    if (!term) {
      this.filterData = this.recipes;
      console.log(this.filterData);
    } else {
      this.filterData = this.recipes.filter(x =>
        x.title.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
      console.log(this.filterData);
    }
  }

  // onShow(e) {
  //   if (e === false) {
  //     this.visible = false;
  //   } else if (e === true) {
  //     this.visible = true;
  //     console.log(this.visible);
  //   }
  // }


  filter() {
    return this.recipes.filter(response => response.user === this.userId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
