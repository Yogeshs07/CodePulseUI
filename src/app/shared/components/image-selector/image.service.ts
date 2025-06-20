import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BlogImage } from '../../models/blog-image.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id:'',
    fileName:'',
    fileExtension:'',
    title:'',
    url:''
  })

  constructor(private http:HttpClient) { }

  uploadImage(file: File, fileName:string, title: string): Observable<BlogImage>{
      
    const formData = new FormData();
    formData.append('file',file);
    formData.append('fileName',fileName);
    formData.append('title',title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/Images`,formData);
  }

  getAllImages(): Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/Images`);
  }

  selectImage(image: BlogImage): void{
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage>{
    return this.selectedImage.asObservable()
  }
}
