import {Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  @Input() recipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
