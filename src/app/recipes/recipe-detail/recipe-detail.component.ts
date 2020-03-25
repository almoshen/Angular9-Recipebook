import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public recipeService: RecipeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.recipeService.getRecipe(params.get('id')).subscribe(recipeData => {
          this.recipe = {
            id: recipeData._id,
            title: recipeData.title,
            instructions: recipeData.instructions,
            imagePath: recipeData.imagePath};
        });
      });
  }

}
