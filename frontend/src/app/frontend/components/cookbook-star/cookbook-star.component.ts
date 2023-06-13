import {Component, Input} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {CookbookService} from "../../../services/cookbook.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cookbook-star',
  templateUrl: './cookbook-star.component.html',
  styleUrls: ['./cookbook-star.component.scss']
})
export class CookbookStarComponent {
  @Input() recipe: Recipe;

  constructor(public recipeService: RecipeService,
              private cookbookService: CookbookService,
              private messageService: MessageService) {

  }

  removeFromCookbook(recipe: Recipe) {
    this.cookbookService.remove(recipe.id)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde aus deinem Kochbuch entfernt.' });
          this.cookbookService.getAll();
          this.recipeService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Rezept konnte nicht entfernt werden.' });
        }
      })
  }

  addToCookbook(recipe: Recipe) {
    this.cookbookService.add(recipe.id)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde deinem Kochbuch hinzugefügt.' });
          this.cookbookService.getAll();
          this.recipeService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Rezept konnte nicht hinzugefügt werden.' });
        }
      })
  }

}
