import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  blogs$ ?: Observable<BlogPost[]>
  constructor(private blogPostService: BlogPostService){

  }
  
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPost();  
  }
}
