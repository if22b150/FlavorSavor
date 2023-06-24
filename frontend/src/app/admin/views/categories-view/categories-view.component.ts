import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent implements OnInit{
  constructor(public categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll();
  }
}
