import {Component, Input} from '@angular/core';
import {Category} from "../../../models/category.model";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  @Input() categories: Category[];
  @Input() withIcon: boolean = true;

  getCategorySeverity (category: Category) {
    switch (category.name) {
      case 'Proteinreich':
        return 'warning';
      // case 'LOWSTOCK':
      //   return 'warning';
      //
      // case 'OUTOFSTOCK':
      //   return 'danger';

      default:
        return null;
    }
  }
}
