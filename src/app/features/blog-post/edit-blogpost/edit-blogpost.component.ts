import { ImageService } from './../../../shared/components/image-selector/image.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-edit-blogpost',
  imports: [RouterModule,CommonModule, FormsModule, ImageSelectorComponent, MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null
  routeSubscription ? : Subscription
  updateBlogPostSubscription ? : Subscription
  getBlogPostSubscription ? : Subscription
  deleteBlogPostSubscription ? : Subscription
  imageSubscription ? : Subscription
  model?: BlogPost
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private router: Router
  )
  {

  }

  onFormSubmit(): void{
    //convert model to api request object
    if(this.model && this.id)
      {
        var updateBlogPost : UpdateBlogPost = {
          title: this.model.title,
          shortDiscription: this.model.shortDiscription,
          content: this.model.content,
          featuredImageUrl: this.model.featuredImageUrl,
          urlHandle: this.model.urlHandle,
          auther: this.model.auther,
          publishedDate: this.model.publishedDate,
          isVisible: this.model.isVisible,
          categories: this.selectedCategories ?? []
        };

        this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response)=>{
            this.router.navigateByUrl('/admin/blogposts')
          }
        })
      } 
  }

  onDelete(){
    if(this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response)=>{
          this.router.navigateByUrl('/admin/blogposts')
        }
      })
    }
  }

  openImageSelector(): void{
    this.isImageSelectorVisible =true
  }

  closeImageSelector():void{
    this.isImageSelectorVisible =false
  }
  
  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params)=>{
        this.id = params.get('id');
      }
    })

    //get BlogPost from API
    if(this.id){
      this.getBlogPostSubscription = this.blogPostService.getAllBlogPostById(this.id).subscribe({
        next: (response)=>{
          this.model = response;
          this.selectedCategories = response.categories.map(x=>x.id);
        }
      })
    }

    this.imageSubscription = this.imageService.onSelectImage()
    .subscribe({
      next: (response)=>{
        if(this.model){
          this.model.featuredImageUrl = response.url;
          this.isImageSelectorVisible = false;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }

}
