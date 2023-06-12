import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient.service";
import {Ingredient} from "../../../models/ingredient.model";
import {CategoryService} from "../../../services/category.service";
import {RecipeService} from "../../../services/recipe.service";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  createRecipeForm: FormGroup;
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
    this.createRecipeForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      time: [null, [Validators.required, Validators.min(1)]],
      servings: [null, [Validators.required, Validators.min(1)]],
      selectedIngredients: [[], Validators.required],
      ingredients: this.formBuilder.array(
        [],
        [Validators.required]
      ),
      categories: [[], Validators.required]
    });

    // if(!this.ingredientService.ingredients || this.ingredientService.ingredients.length == 0)
    //   this.ingredientService.getAll();
    // if(!this.categoryService.categories || this.categoryService.categories.length == 0)
    //   this.categoryService.getAll();
  }

  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.createRecipeForm.reset();
    this.image = null;

  }

  onImageUpload(e) {
    this.image = e.files[0];
  }

  submit() {
    this.submitted = true;
    if(this.createRecipeForm.invalid || !this.image)
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

    this.recipeService.create(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Das Rezept wurde erstellt.' });
          this.closeDialog();
          this.recipeService.getAllByCustomer(this.authService.user.id);
        },
        error: (err) => {
         console.log(err);
         this.messageService.add({ severity: 'danger', summary: 'Fehler', detail: 'Das Rezept konnte nicht erstellt.' });
        }
      })
  }

  createIngredientFormGroup(ingredient: Ingredient) {
    return this.formBuilder.group({
      ingredient: [ingredient],
      text: [null, [Validators.required]],
    })
  }

  initIngredientsGroup(e) {
    let id = e.itemValue.id;
    let newIds = e.value.map(i => i.id);
    let add = newIds.indexOf(id) !== -1;
    if(add) {
      this.ingredients.push(this.createIngredientFormGroup(e.itemValue));
    } else {
      const index = this.ingredients.value.findIndex(ing => ing.ingredient.id === id)
      this.ingredients.removeAt(index);
    }
  }

  getSelectedIngredientByIndex(i:number) {
    return this.selectedIngredients.value[i];
  }

  get title(): AbstractControl {
    return this.createRecipeForm.get('title');
  }
  get description(): AbstractControl {
    return this.createRecipeForm.get('description');
  }
  get time(): AbstractControl {
    return this.createRecipeForm.get('time');
  }
  get servings(): AbstractControl {
    return this.createRecipeForm.get('servings');
  }
  get selectedIngredients(): AbstractControl {
    return this.createRecipeForm.get('selectedIngredients');
  }
  get ingredients(): FormArray {
    return this.createRecipeForm.get('ingredients') as FormArray;
  }
  get categories(): AbstractControl {
    return this.createRecipeForm.get('categories');
  }
}
