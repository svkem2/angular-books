import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookImage } from 'src/app/common/book-image';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  book!: Book;
  bookId!: number;
  bookForm!: FormGroup;
  updateStatus: 'success' | 'failure' | null = null;
  isFormDirty: boolean = false;
  bookImages: BookImage[] = [];
  displayedColumns: string[] = ['property', 'value'];
  bookDetailsDataSource!: MatTableDataSource<any>;
  image!: BookImage;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.bookForm = this.fb.group({
      id: [''],
      title: [''],
      author: [''],
      description: [''],
      price: [''],
      quantityInStock: [''],
      imageUrl: [''],
      category: [''],
      publicationYear: [''],
      isbn: [''],
      language: [''],
      publisher: [''],
      tags: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.bookId = +params.get('id')!;
      this.getBookDetails(this.bookId);
    });
  }

  getBookDetails(bookId: number) {
    this.bookService.getBook(bookId).subscribe((data) => {
      this.book = data;
      this.bookForm.patchValue(data);
      this.bookImages = this.book.images || [];

      // Convert book details to an array of objects for MatTableDataSource
      this.bookDetailsDataSource = new MatTableDataSource<any>(Object.entries(this.book).map(([property, value]) => ({ property, value })));

      // Update relative URLs to point to the assets folder
      this.bookImages.forEach(image => {

        image.imageUrl = `assets/images/books/${image.imageUrl}`;
        
      });
    });
  }

  getFormControl(key: string): FormControl {
    return this.bookForm.controls[key] as FormControl;
  }
  

  updateBook() {
    const updatedBook = this.bookForm.value;
    this.bookService.updateBook(this.bookId, updatedBook).subscribe(
      () => {
        this.updateStatus = 'success';
      },
      (error: any) => {
        console.error('Update failed:', error);
        this.updateStatus = 'failure';
      }
    );
  }

  goToNextBook() {
    const nextBookId = this.bookId + 1;
    this.router.navigate(['/books', nextBookId, 'edit']).then(() => {
      this.updateStatus = null;
      window.scrollTo(0, 0);
    });
  }

  goToPreviousBook() {
    const prevBookId = this.bookId - 1;
    this.router.navigate(['/books', prevBookId, 'edit']).then(() => {
      this.updateStatus = null;
      window.scrollTo(0, 0);
    });
  }

  isEditable(control: AbstractControl): boolean {
    const nonEditableControls = ['id', 'imageUrl'];
    return !nonEditableControls.includes(control.value);
  }
  
  deleteImage(image: any): void {
    const bookId = this.bookId; // Replace with your logic to get the book ID
    const imageId = image.id; // Replace with your logic to get the image ID

    if (confirm('Are you sure you want to delete this image?')) {
      this.bookService.deleteImage(bookId, imageId).subscribe(
        () => {
          // Image deleted successfully, update your local data if needed
          const index = this.bookImages.indexOf(image);
          if (index !== -1) {
            this.bookImages.splice(index, 1);
          }
        },
        (error) => {
          console.error('Failed to delete image:', error);
          // Handle error as needed
        }
      );
    }
  }
}
