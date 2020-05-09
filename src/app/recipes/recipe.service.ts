import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Comment } from '../shared/comment.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { GroceryListService} from '../grocery-list/grocery-list.service';

const BACKEND_URL = environment.API_URL + '/recipes/';

@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipesChanged = new Subject<{recipes: Recipe[], recipeCount: number}>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private router: Router, private groceryListService: GroceryListService) {
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
            ingredients: recipe.ingredients,
            imagePath: recipe.imagePath,
            user: recipe.user,
            username: recipe.username,
            comments: recipe.comments,
            likes: recipe.likes
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
    // return this.recipes[id];
    return this.http.get<{
      _id: string;
      title: string,
      instructions: string,
      ingredients,
      imagePath: string,
      user: string,
      username: string,
      comments,
      likes
    }>(BACKEND_URL + id);
  }

  addRecipe(title: string, instructions: string, ingredients, image: File | string) {
    // const recipe: Recipe = { id: null, title, instructions };
    const recipeData = new FormData();
    recipeData.append('title', title);
    recipeData.append('instructions', instructions);
    recipeData.append('ingredients', JSON.stringify(ingredients));
    recipeData.append('image', image, title);
    this.http.post<{recipe: Recipe}>(BACKEND_URL, recipeData)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateRecipe(id: string, title: string, instructions: string, ingredients, likes: string, image: File | string, comments) {
    let recipeData: Recipe | FormData;
    console.log(typeof image);
    if (typeof image === 'object') {
      recipeData = new FormData();
      recipeData.append('id', id);
      recipeData.append('title', title);
      recipeData.append('instructions', instructions);
      recipeData.append('ingredients', JSON.stringify(ingredients));
      recipeData.append('comments', JSON.stringify(comments));
      recipeData.append('image', image, title);
      recipeData.append('likes', likes);
    } else {
      recipeData = {
        id,
        title,
        instructions,
        ingredients,
        imagePath: image,
        user: null,
        username: null,
        comments,
        likes
      };
    }
    this.http.put(BACKEND_URL + id, recipeData)
      .subscribe(response => {
        this.router.navigate([`/recipe/${id}`]);
      });
  }

  updateLike(likes, id) {
    const like = {likes: Number(likes)};
    this.http.patch(BACKEND_URL + id, like)
      .subscribe(response => {
        this.router.navigate([`/recipe/${id}`]);
      });
  }

  updateComment(username, comment, recipeId) {
    let commentData;
    // commentData = new FormData();
    // commentData.append('username', username);
    // commentData.append('comment', comment);
    // commentData.append('recipeId', recipeId);
    commentData = {
      username,
      comment,
      recipeId
    };
    this.http.post(BACKEND_URL + 'comment', commentData)
      .subscribe(response => {
        this.router.navigate([`/recipe/${recipeId}`]);
      });
    window.location.reload();
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(BACKEND_URL + recipeId);
  }

  addIngredientsToGroceryList(ingredients, userId) {
    this.groceryListService.addIngredients(ingredients, userId);
  }
}
