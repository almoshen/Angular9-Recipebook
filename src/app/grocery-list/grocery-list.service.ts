import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

const BACKEND_URL = environment.API_URL + '/lists/';

@Injectable({providedIn: 'root'})
export class GroceryListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  // private ingredients: Ingredient[] = [];
  private ingredients = [];
  id;

  constructor(private http: HttpClient, private router: Router) {}

  getIngredients() {
    // return this.ingredients = this.http.get<Ingredient[]>(BACKEND_URL + id);
    this.http.get<{ingredients, id}>(BACKEND_URL)
      .pipe(
        map(ingredientData => {
          if (ingredientData === null) {
            return {
              ingredients: []
            };
          }
          return {
            id: ingredientData.id,
            ingredients: ingredientData.ingredients
          };
        })
      )
      .subscribe(transformedIngredients => {
          // this.ingredients.push(...transformedIngredients.ingredients);.
        this.id = transformedIngredients.id;
        this.ingredients = transformedIngredients.ingredients;
        this.ingredientsChanged.next(this.ingredients.slice());
    });
    // this.http.get<{ingredients: any}>(BACKEND_URL + id)
    //   .subscribe((response) => {
    //     if (response !== null) {
    //       const output = response as Ingredient[];
    //       console.log(response);
    //       console.log(output);
    //       this.ingredients.push(...output);
    //       this.ingredientsChanged.next(this.ingredients.slice());
    //       console.log('service' + this.ingredients[1]);
    //     } else {
    //       this.ingredients = [];
    //     }
    //   });
    return this.ingredients;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    if (this.ingredients.length === 0) {
      return this.addGroceryList(ingredient);
    }
    this.ingredients.push(ingredient);
    this.http.patch(BACKEND_URL, this.ingredients)
      .subscribe(responseData => {
        this.router.navigate(['/groceryList']);
      });
    window.location.reload();
  }

  addIngredients(ingredients, userId) {
    const output = ingredients.map(({_id, ...rest}) => rest);
    // const newList = this.ingredients.push(...output);
    if (this.ingredients.length === 0) {
      return this.addGroceryList(output);
    }
    console.log('Output: ' + output);
    const listData = new FormData();
    console.log(JSON.stringify(output));
    // listData.append('ingredients', output);
    // console.log(listData);
    this.http.patch(BACKEND_URL + userId, output).subscribe(response => {
      this.router.navigate(['/groceryList']);
    });
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.http.patch(BACKEND_URL, this.ingredients)
      .subscribe(responseData => {
        this.router.navigate(['/groceryList']);
      });
    window.location.reload();
  }

  deleteIngredient(index: number) {
    if (this.ingredients.length === 1) {
      return this.http.delete(BACKEND_URL).subscribe(responseData => {
        this.router.navigate(['/']);
      });
    }
    this.ingredients.splice(index, 1);
    this.http.patch(BACKEND_URL, this.ingredients)
      .subscribe(responseData => {
        this.router.navigate(['/groceryList']);
      });
    window.location.reload();
  }

  getRecipeChangeListener() {
    return this.ingredientsChanged.asObservable();
  }

  addGroceryList(ingredients) {
    const listData = new FormData();
    listData.append('ingredients', JSON.stringify(ingredients));
    console.log('Save: ' + JSON.stringify(ingredients));
    this.http.post(BACKEND_URL, ingredients)
      .subscribe(responseData => {
        this.router.navigate(['/groceryList']);
      });
    window.location.reload();
  }

  updateGroceryList(ingredients) {
    const listData = new FormData();
    console.log(ingredients);
    listData.append('ingredients', JSON.stringify(ingredients));
    listData.append('id', this.id);
    console.log('Save: ' + JSON.stringify(ingredients));
    this.http.put(BACKEND_URL, ingredients)
      .subscribe(responseData => {
        this.router.navigate(['/groceryList']);
      });
    window.location.reload();
  }

}
