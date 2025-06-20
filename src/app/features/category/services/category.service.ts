import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/Categories?addAuth=true`,model);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/Categories`);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/Categories/${id}`);
  }

  updateCategory(id: string, updateCAtegoryRequest: UpdateCategoryRequest) : Observable<Category>
  {
    return this.http.put<Category>(`${environment.apiBaseUrl}/Categories/${id}?addAuth=true`, updateCAtegoryRequest);
  }

  deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/Categories/${id}?addAuth=true`);
  }
}
