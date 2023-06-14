import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient.service";
import {CategoryService} from "../../../services/category.service";
import {RecipeService} from "../../../services/recipe.service";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {finalize} from "rxjs";
import {Ingredient} from "../../../models/ingredient.model";
import {Recipe} from "../../../models/recipe.model";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent {
  @Input() recipe: Recipe;
  editRecipeForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  loading: boolean;
  image: File;

  constructor(private formBuilder: FormBuilder,
              public ingredientService: IngredientService,
              public categoryService: CategoryService,
              private recipeService: RecipeService,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    console.log(this.recipe)
    let recipeSelectedIngredients = [];
    let recipeIngredients = [];
    this.recipe.ingredients.forEach(i => {
      let ingredient = {
        id: i.ingredientId,
        name: i.ingredientName
      };
      recipeSelectedIngredients.push(ingredient);
      recipeIngredients.push(this.createIngredientFormGroup(ingredient, i.text));
    });

    this.editRecipeForm = this.formBuilder.group({
      title: [this.recipe.title, [Validators.required]],
      description: [this.recipe.description, [Validators.required]],
      time: [this.recipe.time, [Validators.required, Validators.min(1)]],
      servings: [this.recipe.servings, [Validators.required, Validators.min(1)]],
      selectedIngredients: [recipeSelectedIngredients, Validators.required],
      ingredients: this.formBuilder.array(
        recipeIngredients,
        [Validators.required]
      ),
      categories: [this.recipe.categories, Validators.required]
    });
  }

  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    // this.ingredients.clear();
    // this.editRecipeForm.reset();
    // this.image = null;
  }

  onImageUpload(e) {
    this.image = e.files[0];
  }

  submit() {
    this.submitted = true;
    if (this.editRecipeForm.invalid || !this.image)
      return;

    this.loading = true;

    let categoryIds = this.categories.value.map(c => c.id);
    let ingredients = [];
    this.ingredients.value.forEach(i => {
      ingredients.push({
        id: i.ingredient.id,
        text: i.text
      });
    });

    let data = new FormData();
    data.append('title', this.title.value);
    data.append('description', this.description.value);
    data.append('time', this.time.value);
    data.append('servings', this.servings.value);
    data.append('image', this.image);
    categoryIds.forEach((cId, index) => {
      data.append('categoryIds[' + index + ']', cId);
    })
    ingredients.forEach((i, index) => {
      data.append('ingredients[' + index + '][id]', ingredients[index].id);
      data.append('ingredients[' + index + '][text]', ingredients[index].text);
    })
    data.append('newIngredients', JSON.stringify([]));

    this.recipeService.update(this.recipe.id, data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde bearbeitet.'});
          this.closeDialog();
          this.recipeService.getAllByCustomer(this.authService.user.id);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Das Rezept konnte nicht bearbeitet.'});
        }
      })
  }

  createIngredientFormGroup(ingredient: Ingredient, text?: string) {
    return this.formBuilder.group({
      ingredient: [ingredient],
      text: [text, [Validators.required]],
    })
  }

  initIngredientsGroup(e) {
    let id = e.itemValue.id;
    let newIds = e.value.map(i => i.id);
    let add = newIds.indexOf(id) !== -1;
    if (add) {
      this.ingredients.push(this.createIngredientFormGroup(e.itemValue));
    } else {
      const index = this.ingredients.value.findIndex(ing => ing.ingredient.id === id)
      this.ingredients.removeAt(index);
    }
  }

  getSelectedIngredientByIndex(i: number) {
    return this.selectedIngredients.value[i];
  }

  get title(): AbstractControl {
    return this.editRecipeForm.get('title');
  }

  get description(): AbstractControl {
    return this.editRecipeForm.get('description');
  }

  get time(): AbstractControl {
    return this.editRecipeForm.get('time');
  }

  get servings(): AbstractControl {
    return this.editRecipeForm.get('servings');
  }

  get selectedIngredients(): AbstractControl {
    return this.editRecipeForm.get('selectedIngredients');
  }

  get ingredients(): FormArray {
    return this.editRecipeForm.get('ingredients') as FormArray;
  }

  get categories(): AbstractControl {
    return this.editRecipeForm.get('categories');
  }
}
