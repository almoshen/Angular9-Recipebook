import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {switchMap} from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  isAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.recipeService.getRecipe(params.get('id')).subscribe(recipeData => {
          this.recipe = {
            id: recipeData._id,
            title: recipeData.title,
            instructions: recipeData.instructions,
            imagePath: recipeData.imagePath,
            user: recipeData.user
          };
        });
      });
    this.userId = this.authService.getUserId();
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
        this.userId = this.authService.getUserId();
      });
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
