import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor() {

  }

  ngOnInit() {
    this.recipes = [
      {
        id: 1,
        title: 'Eierspeiß',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
          'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo ' +
          'duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit ' +
          'amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ' +
          'ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores' +
          ' et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        time: 30,
        servings: 2,
        imagePath: '',
        ingredients: [
          {
            id: 1,
            name: 'Ei'
          }
        ],
        categories: [
          {
            id: 1,
            name: 'Proteinreich'
          }
        ]
      }
    ]
  }

  // getCategorySeverity (recipe) {
  //   switch (product.inventoryStatus) {
  //     case 'INSTOCK':
  //       return 'success';
  //
  //     case 'LOWSTOCK':
  //       return 'warning';
  //
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //
  //     default:
  //       return null;
  //   }
  // };
}
