import { Ingredient } from '../shared/ingredient.model';

export interface Recipe {
  id: string;
  title: string;
  instructions: string;
  ingredients: Ingredient[];
  imagePath: string;
  user: string;
  username: string;
  comments: [];
  likes;
}
