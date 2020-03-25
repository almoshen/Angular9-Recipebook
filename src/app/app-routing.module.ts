import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent},
  { path: 'create', component: RecipeCreateComponent, canActivate: [AuthGuard]},
  { path: 'groceryList', component: GroceryListComponent},
  { path: 'edit/:recipeId', component: RecipeCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
