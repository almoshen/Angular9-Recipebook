import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {
  form: FormGroup;
  ingredients: FormArray;
  private mode = 'create';
  private recipeId: string;
  recipe: Recipe;
  isLoading = false;
  imagePreview: string;

  constructor(public recipeService: RecipeService, public route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let recipeTitle = '';
    let recipeInstruction = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);

    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      instructions: new FormControl(null, {validators: [Validators.required]}),
      ingredients: recipeIngredients,
      image: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recipeId')) {
        this.mode = 'edit';
        this.recipeId = paramMap.get('recipeId');
        this.isLoading = true;
        this.recipeService.getRecipe(this.recipeId).subscribe(recipeData => {
          this.isLoading = false;
          this.recipe = {id: recipeData._id, title: recipeData.title,
            instructions: recipeData.instructions,
            ingredients: recipeData.ingredients,
            imagePath: recipeData.imagePath,
            user: recipeData.user,
            username: recipeData.username,
            comments: recipeData.comments,
            likes: recipeData.likes
          };
          recipeTitle = this.recipe.title;
          recipeInstruction = this.recipe.instructions;
          recipeImagePath = this.recipe.imagePath;
          if (this.recipe.ingredients) {
            for (const ingredient of this.recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
          // console.log(recipeIngredients);
          // this.form.setValue(
          //   {title: this.recipe.title, instructions: this.recipe.instructions,
          //     ingredients: recipeIngredients, image: this.recipe.imagePath});
          this.form = new FormGroup({
            title: new FormControl(recipeTitle, {validators: [Validators.required]}),
            instructions: new FormControl(recipeInstruction, {validators: [Validators.required]}),
            ingredients: recipeIngredients,
            image: new FormControl(recipeImagePath, {validators: [Validators.required]})
          });
        });
      } else {
        this.mode = 'create';
        this.recipeId = null;
      }
    });
  }

  onPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get controls() { // a getter!
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }


  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onAddRecipe() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.recipeService.addRecipe(this.form.value.title, this.form.value.instructions, this.form.value.ingredients, this.form.value.image);
    } else {
      console.log(this.recipe.comments);
      this.recipeService.updateRecipe(this.recipeId, this.form.value.title,
        this.form.value.instructions, this.form.value.ingredients,  this.recipe.likes, this.form.value.image, this.recipe.comments);
    }
    this.form.reset();
  }

}
