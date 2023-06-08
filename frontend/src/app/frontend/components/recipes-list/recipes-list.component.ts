import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {Category} from "../../../models/category.model";
import {ERole} from "../../../models/user.model";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../services/breadcrumb.service";


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  recipesLoading: boolean;

  constructor(public recipeService: RecipeService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {

  }

  ngOnInit() {
    this.recipesLoading = true;
    this.recipeService.getAll()
      .pipe(finalize(() => this.recipesLoading = false))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        }
      })

    // this.recipes = [
    //   {
    //     id: 1,
    //     title: 'Eierspeiß',
    //     description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
    //       'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo ' +
    //       'duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit ' +
    //       'amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ' +
    //       'ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores' +
    //       ' et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    //     time: 30,
    //     servings: 2,
    //     imagePath: 'assets/images/recipe.jpg',
    //     ingredients: [
    //       {
    //         id: 1,
    //         name: 'Eier'
    //       },
    //       {
    //         id: 2,
    //         name: 'Zwiebeln'
    //       },
    //       {
    //         id: 3,
    //         name: 'Salz'
    //       },
    //       {
    //         id: 4,
    //         name: 'Pfeffer'
    //       }
    //     ],
    //     categories: [
    //       {
    //         id: 1,
    //         name: 'Proteinreich'
    //       }
    //     ],
    //     user: {
    //       id: 1,
    //       email: '',
    //       verified: true,
    //       username: 'JohnBoy',
    //       role: ERole.CUSTOMER
    //     }
    //   }
    // ]
  }

  navigateToRecipe(recipe: Recipe) {
    this.breadcrumbService.breadcrumb = {link: '/recipes', text: 'Alle Rezepte'};
  }

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
  };

  getDashSeperatedTitle(recipe: Recipe) {
    return recipe.title.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase() + '-' + recipe.id;
  }

}
