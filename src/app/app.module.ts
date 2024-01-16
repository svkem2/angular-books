import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { TruncatePipe } from './truncate.pipe';
import { RouterModule, Routes } from '@angular/router';
import { BookCategoriesMenuComponent } from './components/book-categories-menu/book-categories-menu.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


const routes: Routes = [
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'books/:id/edit', component: BookEditComponent },
  { path: 'search/:keyword', component: BookListComponent },
  { path: 'category/:category', component: BookListComponent },
  { path: 'category', component: BookListComponent },
  { path: 'books', component: BookListComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    BookListComponent,
    TruncatePipe,
    BookCategoriesMenuComponent,
    SearchComponent,
    BookDetailsComponent,
    BookEditComponent, 
    
  ],
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    PaginationModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
