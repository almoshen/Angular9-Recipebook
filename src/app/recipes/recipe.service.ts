import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.API_URL + '/recipes/';

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipesChanged = new Subject<{recipes: Recipe[], recipeCount: number}>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  getRecipes(recipesPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${recipesPerPage}&page=${currentPage}`;
    this.http.get<{recipes: any, maxRecipes: number}>(
      BACKEND_URL + queryParams
    )
      .pipe(map(recipeData => {
        return { recipes: recipeData.recipes.map(recipe => {
          return {
            id: recipe._id,
            title: recipe.title,
            instructions: recipe.instructions,
            imagePath: recipe.imagePath
          };
        }),
        maxRecipes: recipeData.maxRecipes
        };
      }))
      .subscribe(transformedRecipeData => {
        this.recipes = transformedRecipeData.recipes;
        this.recipesChanged.next({
          recipes: [...this.recipes],
          recipeCount: transformedRecipeData.maxRecipes
        });
    });
  }

  getRecipeChangeListener() {
    return this.recipesChanged.asObservable();
  }

  getRecipe(id: string) {
    return this.http.get<{_id: string; title: string, instructions: string, imagePath: string}>(BACKEND_URL + id);
  }

  addRecipe(title: string, instructions: string, image: File | string) {
    // const recipe: Recipe = { id: null, title, instructions };
    const recipeData = new FormData();
    recipeData.append('title', title);
    recipeData.append('instructions', instructions);
    recipeData.append('image', image, title);
    this.http.post<{recipe: Recipe}>(BACKEND_URL, recipeData)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateRecipe(id: string, title: string, instructions: string, image: File | string) {
    let recipeData: Recipe | FormData;
    if (typeof image === 'object') {
      recipeData = new FormData();
      recipeData.append('id', id),
      recipeData.append('title', title);
      recipeData.append('instructions', instructions);
      recipeData.append('image', image, title);
    } else {
      recipeData = {
        id,
        title,
        instructions,
        imagePath: image
      };
    }
    this.http.put(BACKEND_URL + id, recipeData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(BACKEND_URL + recipeId);
  }
}
