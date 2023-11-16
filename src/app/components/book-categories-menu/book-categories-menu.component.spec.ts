import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesMenuComponent } from './book-categories-menu.component';

describe('BookCategoriesMenuComponent', () => {
  let component: BookCategoriesMenuComponent;
  let fixture: ComponentFixture<BookCategoriesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesMenuComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
