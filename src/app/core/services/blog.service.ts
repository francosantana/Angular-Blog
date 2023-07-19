import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment';
import { switchMap, tap, of, map} from 'rxjs';
import { AuthService } from './auth.service';

//types
import { BlogCreateParam, BlogsHttpGetAll, BlogHttpGet } from 'src/app/shared/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private snack: MatSnackBar, private authService: AuthService) { }

  create(blog: BlogCreateParam){
    return this.http.post(environment.apiUrl + 'api/v1/blogs/', blog).pipe(
      tap(
        ()=>{
          this.snack.open('Post created', 'Dismiss', {duration: 3000})
        }
      ))
  }

  get getAll(){
    return this.http.get<BlogsHttpGetAll>(environment.apiUrl + 'api/v1/blogs/')
  }

  getUnique(id: string){
    return this.http.get<BlogHttpGet>(environment.apiUrl + 'api/v1/blogs/' + id)
  }

  //Return all the blogs of a given user
  fetchUserBlogs(user_id: string){
      return this.getAll.pipe(
        map(value => value.data.filter(blog => blog.author == user_id))
      )
  }

  // Includes author data with the blog
  // return null if blog is not found
  // return {blog, user: null} if is not logged (getUser logic)
  // return {blog, user} if all is meet
  fetchBlog(id: string){
    return this.getUnique(id).pipe(
      switchMap(blog =>{
        if (blog){
          return this.authService.getUserFromList(blog.data.author).pipe(
            map(user => {return {...blog.data, user}})
          )
        } else {
          return of(null)
        }
      }),
    )
  }

  deleteBlog(id: string){
    return this.http.delete(environment.apiUrl + `api/v1/blogs/${id}/`)
  }
}
