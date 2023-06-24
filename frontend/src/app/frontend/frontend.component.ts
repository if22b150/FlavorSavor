import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth/auth.service";
import {User} from "../models/user.model";
import {BreadcrumbService} from "../services/breadcrumb.service";
import {IngredientService} from "../services/ingredient.service";
import {CategoryService} from "../services/category.service";
import {RecipeService} from "../services/recipe.service";
import {NavigationEnd, Router, Scroll} from "@angular/router";

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit {
  items: MenuItem[];
  isHome: boolean = true;

  constructor(private authService: AuthService,
              public breadcrumbService: BreadcrumbService,
              private ingredientService: IngredientService,
              private categoryService: CategoryService,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(u => {
      if(u instanceof NavigationEnd) {
        this.isHome = u.url == '/home';
      }
      if(u instanceof Scroll) {
        this.isHome = u.routerEvent.url == '/home';
      }
    })

    if(!this.ingredientService.ingredients || this.ingredientService.ingredients.length == 0)
      this.ingredientService.getAll();
    if(!this.categoryService.categories || this.categoryService.categories.length == 0)
      this.categoryService.getAll();
    if(!this.recipeService.recipes || this.recipeService.recipes.recipes.length == 0)
      this.recipeService.getAllFiltered();

    this.authService.user$.subscribe({
      next: (user: User) => {
        if(this.authService.isLoggedIn) {
          this.items = [
            {
              label: 'Rezepte durchsuchen',
              icon: 'pi pi-fw pi-search',
              routerLink: '/recipes',
            },
            {
              label: 'Meine Rezepte',
              icon: 'pi pi-fw pi-list',
              routerLink: '/my-recipes'
            },
            {
              label: 'Mein Kochbuch',
              icon: 'pi pi-fw pi-book',
              routerLink: '/cookbook'
            },
            {
              label: 'Account',
              icon: 'pi pi-fw pi-user',
              routerLink: '/account'
            }
          ];
        } else {
          this.items = [
            {
              label: 'Rezepte durchsuchen',
              icon: 'pi pi-fw pi-search',
              routerLink: '/recipes',
            },
            {
              label: 'Login',
              icon: 'pi pi-fw pi-sign-in',
              routerLink: '/auth/login'
            }
          ];
        }
      }
    })
  }

}
