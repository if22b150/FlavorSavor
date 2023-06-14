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
  @Input() rounded: boolean = false;
  @Input() gap: string = '3';

  getCategorySeverity (category: Category) {
    switch (category.name) {
      case 'Low Carb':
        return 'warning';
      case 'Scharf':
        return 'danger';
      case 'Vegetarisch':
        return null;
      case 'Vegan':
        return 'success';
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
