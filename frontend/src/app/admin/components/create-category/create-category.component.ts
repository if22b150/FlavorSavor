import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit{
  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              public categoryService: CategoryService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.createForm.reset();
  }

  submit() {
    this.submitted = true;
    if(this.createForm.invalid)
      return;

    this.loading = true;

    this.categoryService.create(this.name.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Die Kategorie wurde erstellt.' });
          this.closeDialog();
          this.categoryService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Die Kategorie konnte nicht erstellt.' });
        }
      })
  }

  get name(): AbstractControl {
    return this.createForm.get('name');
  }
}
