import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../services/admin/user.service";
import {User} from "../../../../models/user.model";
import {finalize} from "rxjs";
import {RecipeService} from "../../../../services/admin/recipe.service";
import {Recipe} from "../../../../models/recipe.model";

@Component({
  selector: 'app-recipe-delete',
  template: `
    <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
  `,
  styles: []
})
export class DeleteRecipeComponent {
  @Input() recipe: Recipe;
  loading: boolean;

  constructor(private recipeService: RecipeService) {
  }

  delete() {
    this.loading = true;
    this.recipeService.delete(this.recipe.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.recipeService.getAll();
        }
      })
  }
}
