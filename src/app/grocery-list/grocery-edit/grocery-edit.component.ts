import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroceryListService} from '../grocery-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-grocery-edit',
  templateUrl: './grocery-edit.component.html',
  styleUrls: ['./grocery-edit.component.scss']
})
export class GroceryEditComponent implements OnInit, OnDestroy {
  listForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private groceryListService: GroceryListService,
              private authService: AuthService) { }

  ngOnInit() {
    this.listForm = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      amount: new FormControl(null, {validators: [Validators.required]}),
    });
    this.subscription = this.groceryListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.groceryListService.getIngredient(index);
          this.listForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit() {
    const value = this.listForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.groceryListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.groceryListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.listForm.reset();
  }



  onClear() {
    this.listForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.groceryListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
