import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {switchMap} from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  commentForm: FormGroup;
  isAuthenticated = false;
  userId: string;
  username: string;
  private recipeId: string;
  private authStatusSub: Subscription;
  likes = 0;
  liked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      comment: new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recipeId = params.get('recipeId');
      this.recipeService.getRecipe(params.get('id')).subscribe(recipeData => {
          this.recipe = {
            id: recipeData._id,
            title: recipeData.title,
            instructions: recipeData.instructions,
            ingredients: recipeData.ingredients,
            imagePath: recipeData.imagePath,
            user: recipeData.user,
            username: recipeData.username,
            comments: recipeData.comments,
            likes: recipeData.likes
        };
      });
    });
    this.userId = this.authService.getUserId();
    this.username = this.authService.getUsername();
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
        this.userId = this.authService.getUserId();
        this.username = this.authService.getUsername();
      });
  }

  onLike() {
    this.likes = Number(this.recipe.likes);
    this.likes += 1;
    this.liked = true;
    const numbers = this.likes.toString();
    this.recipeService.updateLike(numbers, this.recipe.id);
  }

  onAddComment() {
    console.log(this.commentForm);
    if (this.commentForm.invalid) {
      return;
    }
    this.recipeService.updateComment(this.recipe.username, this.commentForm.value.comment, this.recipe.id);
    this.commentForm.reset();
  }

  onAddToGroceryList() {
    console.log(this.recipe.ingredients);
    this.recipeService.addIngredientsToGroceryList(this.recipe.ingredients, this.userId);
  }

  onDelete(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
