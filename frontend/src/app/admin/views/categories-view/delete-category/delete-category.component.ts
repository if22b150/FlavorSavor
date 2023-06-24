import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import {Category} from "../../../../models/category.model";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-category-delete',
  template: `
    <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
  `,
  styles: []
})
export class DeleteCategoryComponent {
  @Input() category: Category;
  loading: boolean;

  constructor(private categoryService: CategoryService) {
  }

  delete() {
    this.loading = true;
    this.categoryService.delete(this.category.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.categoryService.getAll();
        }
      })
  }
}
