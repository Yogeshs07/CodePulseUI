import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guard/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'blog/:url', component: BlogDetailsComponent },
    { path: 'admin/categories', component: CategoryListComponent, canActivate:[authGuard] },
    { path: 'admin/category/add', component: AddCategoryComponent, canActivate:[authGuard] },
    { path: 'admin/category/:id', component: EditCategoryComponent, canActivate:[authGuard] },
    { path: 'admin/blogposts', component: BlogpostListComponent, canActivate:[authGuard] },
    { path: 'admin/blogposts/add', component: AddBlogpostComponent, canActivate:[authGuard] },
    { path: 'admin/blogposts/:id', component: EditBlogpostComponent, canActivate:[authGuard] },
];
