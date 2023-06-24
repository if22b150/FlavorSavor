import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesAdminViewComponent } from './recipes-admin-view.component';

describe('RecipesAdminViewComponent', () => {
  let component: RecipesAdminViewComponent;
  let fixture: ComponentFixture<RecipesAdminViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesAdminViewComponent]
    });
    fixture = TestBed.createComponent(RecipesAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
