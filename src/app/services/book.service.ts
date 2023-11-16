import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { Book } from '../common/book';
import { BookImage } from '../common/book-image';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';
  private categoryUrl = 'http://localhost:8080/api/books'

  constructor(private httpClient: HttpClient) { }

  getBookListByCategory(thePage: number, thePageSize: number, category: string): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryContaining?category=${category}&page=${thePage}&size=${thePageSize}`;
    console.log('-------------' + searchUrl);
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  private getBooks(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.books),
      catchError(error => {
        console.error('Error fetching book data:', error);
        return of([]);
      })
    );
  }

  getBookListAll(): Observable<Book[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.books)
    )
  }

  getBookListAllPaginate(thePage: number,
    thePageSize: number): Observable<GetResponse> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}`
      + `?page=${thePage}&size=${thePageSize}`;

    console.log("***Trying paginate at " + searchUrl);

    return this.httpClient.get<GetResponse>(searchUrl);
  }

  searchBooks(keyword: string | null, thePage: number, thePageSize: number): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/searchBooks?keyword=${keyword}&page=${thePage}&size=${thePageSize}`;
    console.log('-------------Keyword Search' + searchUrl);
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getBook(bookId: number): Observable<Book> {
    const bookUrl = `${this.baseUrl}/${bookId}`;
    const imagesUrl = `${bookUrl}/images`; // Assuming this is your endpoint for fetching book images
    console.log("Getting Images  imagesURL: " + imagesUrl);

    const book$ = this.httpClient.get<Book>(bookUrl);
    const images$ = this.httpClient.get<BookImage[]>(imagesUrl);

    // Combine book and images into a single observable
    return forkJoin([book$, images$]).pipe(
      map(([book, images]) => ({ ...book, images }))
    );
  }

  updateBook(bookId: number, updatedBook: Book) {
    console.log("Updating Book - " + JSON.stringify(updatedBook));
    return this.httpClient.put(`${this.baseUrl}/${bookId}`, updatedBook);
  }
  deleteImage(bookId: number, imageId: number): Observable<void> {
    const url = `${this.baseUrl}/${bookId}/images/${imageId}`;
    return this.httpClient.delete<void>(url);
  }

}

interface GetResponse {
  _embedded: {
    books: Book[];
  }
}
