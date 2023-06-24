import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import {Ingredient} from "../../../../models/ingredient.model";
import {IngredientService} from "../../../../services/ingredient.service";

@Component({
  selector: 'app-ingredient-delete',
  template: `
    <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
  `,
  styles: []
})
export class DeleteIngredientComponent {
  @Input() ingredient: Ingredient;
  loading: boolean;

  constructor(private ingredientService: IngredientService) {
  }

  delete() {
    this.loading = true;
    this.ingredientService.delete(this.ingredient.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.ingredientService.getAll();
        }
      })
  }
}
