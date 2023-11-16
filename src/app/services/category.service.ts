import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories'; 

  constructor(private http: HttpClient) {}

  getDistinctCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
