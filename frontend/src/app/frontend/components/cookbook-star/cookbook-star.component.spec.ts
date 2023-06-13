import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbookStarComponent } from './cookbook-star.component';

describe('CookbookStarComponent', () => {
  let component: CookbookStarComponent;
  let fixture: ComponentFixture<CookbookStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookbookStarComponent]
    });
    fixture = TestBed.createComponent(CookbookStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
