import {Component, Input} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {CookbookService} from "../../../services/cookbook.service";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs";

@Component({
  selector: 'app-cookbook-star',
  templateUrl: './cookbook-star.component.html',
  styleUrls: ['./cookbook-star.component.scss']
})
export class CookbookStarComponent {
  @Input() recipe: Recipe;
  loading: boolean;

  constructor(public recipeService: RecipeService,
              private cookbookService: CookbookService,
              private messageService: MessageService) {

  }

  removeFromCookbook(recipe: Recipe) {
    this.loading = true;
    this.cookbookService.remove(recipe.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde aus deinem Kochbuch entfernt.' });
          this.cookbookService.getAll();
          this.recipeService.getAllFiltered(true);
          this.recipeService.setRecipeSaved(recipe.id, false);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Rezept konnte nicht entfernt werden.' });
        }
      })
  }

  addToCookbook(recipe: Recipe) {
    this.loading = true;
    this.cookbookService.add(recipe.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (r) => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde deinem Kochbuch hinzugefügt.' });
          this.cookbookService.getAll();
          this.recipeService.getAllFiltered(true);
          this.recipeService.setRecipeSaved(recipe.id, true);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Rezept konnte nicht hinzugefügt werden.' });
        }
      })
  }

}
