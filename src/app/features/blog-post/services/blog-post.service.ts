import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor( private http:HttpClient) { }

  createBlogPost(data:AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/BlogPosts?addAuth=true`,data)
  }

  getAllBlogPost() : Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/BlogPosts`)    
  }

  getAllBlogPostById(id:string) : Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/BlogPosts/${id}`)
  }

  getAllBlogPostByUrlHandle(urlHandle:string) : Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/BlogPosts/${urlHandle}`)
  }

  updateBlogPost(id:string, updateBlogPost:UpdateBlogPost) : Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/BlogPosts/${id}?addAuth=true`,updateBlogPost)
  }

  deleteBlogPost(id:string) : Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/BlogPosts/${id}?addAuth=true`)
  }
}
