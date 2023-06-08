import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {Category} from "../../../models/category.model";
import {BreadcrumbService} from "../../../services/breadcrumb.service";

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  recipe: Recipe;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private recipeService: RecipeService,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    let title = this.route.snapshot.paramMap.get('recipeUrl');
    let id = +title.split('-').pop();
    if(!id || isNaN(id)) {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Das gesuchte Rezept existiert nicht.'});
      this.router.navigate(['/recipes']);
    }

    this.loading = true;
    this.recipeService.getOne(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (recipe) => {
          this.recipe = recipe;
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Das gesuchte Rezept konnte nicht abgerufen werden.'});
          this.router.navigate(['/recipes']);
        }
      })
  }


}
