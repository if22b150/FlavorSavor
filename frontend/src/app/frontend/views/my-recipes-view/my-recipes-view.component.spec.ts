import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipesViewComponent } from './my-recipes-view.component';

describe('MyRecipesViewComponent', () => {
  let component: MyRecipesViewComponent;
  let fixture: ComponentFixture<MyRecipesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRecipesViewComponent]
    });
    fixture = TestBed.createComponent(MyRecipesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
