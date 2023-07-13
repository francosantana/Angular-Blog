import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment';
import { BlogCreate, BlogsHttpGet } from 'src/app/shared/models/blog.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  createObs(blog: BlogCreate){
    return this.http.post(environment.apiUrl + 'api/v1/blogs/', blog).pipe(
      tap(
        ()=>{
          this.snack.open('Post created', 'Dismiss', {duration: 3000})
        }
      ))
  }

  get getObs(){
    return this.http.get<BlogsHttpGet>(environment.apiUrl + 'api/v1/blogs/')
  }
}
