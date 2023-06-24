import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../../services/recipe.service";
import {BreadcrumbService} from "../../../services/breadcrumb.service";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit{
  constructor(private recipeService: RecipeService,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb = null;
    this.recipeService.filters = null;
    this.recipeService.getAll();
  }
}
