import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../../../services/ingredient.service";

@Component({
  selector: 'app-ingredients-view',
  templateUrl: './ingredients-view.component.html',
  styleUrls: ['./ingredients-view.component.scss']
})
export class IngredientsViewComponent implements OnInit{
  constructor(public ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.ingredientService.getAll();
  }
}
