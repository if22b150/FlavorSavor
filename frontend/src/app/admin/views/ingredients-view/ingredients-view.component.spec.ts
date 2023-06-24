import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsViewComponent } from './ingredients-view.component';

describe('IngredientsViewComponent', () => {
  let component: IngredientsViewComponent;
  let fixture: ComponentFixture<IngredientsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsViewComponent]
    });
    fixture = TestBed.createComponent(IngredientsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
