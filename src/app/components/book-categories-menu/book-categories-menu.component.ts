import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-categories-menu',
  templateUrl: './book-categories-menu.component.html',
  styleUrls: ['./book-categories-menu.component.css']
})
export class BookCategoriesMenuComponent implements OnInit {
  categories: String[] = [];

  constructor(private categoryService: CategoryService){

  }

  ngOnInit(): void {
    this.listBookCategories();
  }
  listBookCategories() {
    this.categoryService.getDistinctCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
