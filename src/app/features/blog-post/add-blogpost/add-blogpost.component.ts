import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  imports: [RouterModule, FormsModule, CommonModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model: AddBlogPost;
  categories$ ?: Observable<Category[]>;
  imageSubscription ? : Subscription;
  isImageSelectorVisible: boolean = false;

  constructor(private blogPostService: BlogPostService, 
    private router: Router,
    private imageService: ImageService,
    private categoryService: CategoryService
  ){
    this.model={
      title: '',
      shortDiscription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      auther: '',
      publishedDate: new Date(),
      isVisible: true,
      categories: []
    }
  }
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSubscription = this.imageService.onSelectImage()
    .subscribe({
      next: (selectedImage)=>{
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    })
  }

  onFormSubmit(): void{
    this.blogPostService.createBlogPost(this.model).
    subscribe({
      next: (response)=>{
        this.router.navigateByUrl('/admin/blogposts')
      }
    });
  }

  openImageSelector(): void{
    this.isImageSelectorVisible =true
  }

  closeImageSelector():void{
    this.isImageSelectorVisible =false
  }

  ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
  }

}
