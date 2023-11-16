import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list-table.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentCategory: string = '';
  searchMode: boolean = false;
  // new properties for pagination
  thePageNumber = 1;
  thePageSize = 8;
  theTotalElements = 0;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  listBooks(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchListBooks();
    } else {
      this.handleListBooks();
    }
  }

  handleSearchListBooks(): void {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    if (keyword) {
      this.bookService
        .searchBooks(keyword, this.thePageNumber - 1, this.thePageSize)
        .subscribe(
          (data) => this.processResult(data),
          (error) => console.error('Error fetching search results:', error)
        );
    } else {
      console.error('Keyword parameter is null');
    }
  }

  handleListBooks(): void {
    const hasCategory = this.route.snapshot.paramMap.has('category');
    if (hasCategory) {
      this.currentCategory = this.route.snapshot.paramMap.get('category') || '';
      console.log('Searching on category: ' + this.currentCategory);
      this.bookService
        .getBookListByCategory(
          this.thePageNumber - 1,
          this.thePageSize,
          this.currentCategory
        )
        .subscribe(
          (data) => this.processResult(data),
          (error) => console.error('Error fetching books by category:', error)
        );
    } else {
      this.bookService
        .getBookListAllPaginate(this.thePageNumber - 1, this.thePageSize)
        .subscribe(
          (data) => this.processResult(data),
          (error) => console.error('Error fetching all books:', error)
        );
    }
  }

  processResult(data: any): void {
    if (data._embedded && data._embedded.books) {
      this.books = data._embedded.books;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
