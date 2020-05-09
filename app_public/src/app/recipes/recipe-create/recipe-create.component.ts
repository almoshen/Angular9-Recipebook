import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private recipeId: string;
  recipe: Recipe;
  isLoading = false;
  imagePreview: string;

  constructor(public recipeService: RecipeService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      instructions: new FormControl(null, {validators: [Validators.required]}),
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
            imagePath: recipeData.imagePath,
            user: recipeData.user
          };
          this.form.setValue(
            {title: this.recipe.title, instructions: this.recipe.instructions, image: this.recipe.imagePath});
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

  onAddRecipe() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.recipeService.addRecipe(this.form.value.title, this.form.value.instructions, this.form.value.image);
    } else {
      this.recipeService.updateRecipe(this.recipeId, this.form.value.title,
        this.form.value.instructions, this.form.value.image);
    }
    this.form.reset();
  }

}
