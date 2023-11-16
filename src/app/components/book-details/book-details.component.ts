import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookImage } from 'src/app/common/book-image';
import { BookService } from 'src/app/services/book.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book!: Book;
  bookId!: number;
  safeDescription!: SafeHtml;
  bookImages: BookImage[] = [];

  displayedColumns: string[] = ['property', 'value'];
  bookDetailsDataSource!: MatTableDataSource<any>;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.bookId = +this.route.snapshot.paramMap.get('id')!;
      this.getBookDetails(this.bookId);
    });
  }

  getBookDetails(bookId: number) {
    this.bookService.getBook(bookId).subscribe((data) => {
      this.book = data;
      this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.book.description);
      this.bookImages = this.book.images || [];

      // Convert book details to an array of objects for MatTableDataSource
      this.bookDetailsDataSource = new MatTableDataSource<any>(Object.entries(this.book).map(([property, value]) => ({ property, value })));

      // Update relative URLs to point to the assets folder
      this.bookImages.forEach(image => {
        image.imageUrl = `assets/images/books/${image.imageUrl}`;
      });
    });
  }


  handleBookDetails() {
    const bookId = +this.route.snapshot.paramMap.get('id')!;
    if (bookId !== null) {
      if (!isNaN(bookId)) {
        this.bookService.getBook(bookId).subscribe(
          (data) => {
            console.log("Get Book - " + JSON.stringify(data));
            this.book = data;
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.book.description);
          },
          (error) => {
            console.error("Error getting book:", error);
          }
        );
      } else {
        console.error("Invalid bookId:", bookId);
      }
    } else {
      console.error("ID parameter is null");
    }
  }

  navigateToEditPage(bookId: number) {
    this.router.navigate(['/books', bookId, 'edit']);
  }

  deleteImage(_t18: BookImage) {
    throw new Error('Method not implemented.');
  }
  editImage(_t18: BookImage) {
    throw new Error('Method not implemented.');
  }

}
