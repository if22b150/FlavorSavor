import {Component, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {IngredientService} from "../../../services/ingredient.service";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {Recipe} from "../../../models/recipe.model";

@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.scss']
})
export class FilterRecipesComponent {
  suggestionRecipes: Observable<any[]>;
  searchForm: FormGroup;
  loading: boolean;
  hasFilters: boolean;
  @Input() isHome: boolean;

  constructor(public recipeService: RecipeService,
              private breadcrumbService: BreadcrumbService,
              private formBuilder: FormBuilder,
              public ingredientService: IngredientService,
              public categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: [null],
      ingredients: [[]],
      categories: [[]]
    });

    this.recipeService.filters$
      .subscribe({
        next: (f) => {
          this.title.setValue({title: f?.title});
          this.ingredients.setValue(f?.ingredients);
          this.categories.setValue(f?.categories);

          this.hasFilters = !((!this.title.value || !this.title.value.title) && (!this.ingredients.value || this.ingredients.value.length == 0) && (!this.categories.value || this.categories.value.length == 0));
        }
      })
  }

  filterRecipes(event) {
    this.suggestionRecipes = this.recipeService.getSearch(event.query)
      .pipe(tap(list => list.unshift({id: -1, title: event.query})));
  }

  getDashSeperatedTitle(recipe: Recipe) {
    return '/recipes/' + this.dashSeparateString(recipe.title) + '-' + recipe.id;
  }

  navigateToRecipe() {
    this.breadcrumbService.breadcrumb = {link: '/home', text: 'Home'};
  }

  dashSeparateString(s: string): string {
    if(!s)
      return null;
    return s.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  submit() {
    let title = this.title.value ? (typeof this.title.value === 'string' ? this.title.value : this.title.value.title) : null;
    this.recipeService.filters = {
      title: title,
      ingredients: this.ingredients.value,
      categories: this.categories.value
    }

    this.recipeService.getAllFiltered();

    if(this.isHome)
      this.router.navigate(['/recipes']);
  }

  // private noFiltersSet(): boolean {
    // if(!this.recipeService.filters)
    //   return false;
    // return !(!this.recipeService.filters.title &&
    //   (!this.recipeService.filters.ingredients || this.recipeService.filters.ingredients.length == 0) &&
    //   (!this.recipeService.filters.categories || this.recipeService.filters.categories.length == 0));
  // }

  get title(): AbstractControl {
    return this.searchForm.get('title');
  }

  get ingredients(): AbstractControl {
    return this.searchForm.get('ingredients');
  }

  get categories(): AbstractControl {
    return this.searchForm.get('categories');
  }
}
