import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment';
import { tap } from 'rxjs';

//types
import { BlogCreateParam, BlogsHttpGetAll, BlogHttpGet } from 'src/app/shared/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  createObs(blog: BlogCreateParam){
    return this.http.post(environment.apiUrl + 'api/v1/blogs/', blog).pipe(
      tap(
        ()=>{
          this.snack.open('Post created', 'Dismiss', {duration: 3000})
        }
      ))
  }

  get getObs(){
    return this.http.get<BlogsHttpGetAll>(environment.apiUrl + 'api/v1/blogs/')
  }

  getUnique(id: string){
    return this.http.get<BlogHttpGet>(environment.apiUrl + 'api/v1/blogs/' + id).pipe()
  }
}
