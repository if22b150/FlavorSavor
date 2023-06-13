import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {BreadcrumbService} from "../../../services/breadcrumb.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  recipe: Recipe;
  loading: boolean;
  isMyRecipe: boolean;
  buttonLoading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private recipeService: RecipeService,
              private breadcrumbService: BreadcrumbService,
              public authService: AuthService,
              private confirmationService: ConfirmationService) {
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
          this.isMyRecipe = this.authService.user?.id == this.recipe.user.id;
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Das gesuchte Rezept konnte nicht abgerufen werden.'});
          this.router.navigate(['/recipes']);
        }
      })
  }

  edit() {

  }

  delete(event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Willst du das Rezept "' + this.recipe.title + '" wirklich endgültig löschen?',
      acceptLabel: 'Ja',
      rejectLabel: 'Nein',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.buttonLoading = true;
        this.recipeService.delete(this.recipe.id)
          .pipe(finalize(() => this.buttonLoading = false))
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde gelöscht.' });
              this.router.navigate(['my-recipes']);
              this.recipeService.getAllByCustomer(this.authService.user.id);
            },
            error: (err) => {
              console.log(err);
              this.messageService.add({ severity: 'danger', summary: 'Fehler', detail: 'Das Rezept konnte nicht gelöscht werden.' });
            }
          })
      },
      reject: () => {

      }
    });
  }

}
