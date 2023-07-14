import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, of } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { User } from 'src/app/shared/models/user.model';

import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [CommonModule, MatDividerModule]
})
export class BlogComponent implements OnInit {
  blog: Blog| null = null
  user: User | null = null

  constructor(
    private route: ActivatedRoute, 
    private blogService: BlogService,
    private authService: AuthService){}

  ngOnInit(): void {

     // Handle response
      this.fetchBlogOnUrl.subscribe(value => {
        if(value){
          this.blog = value.blog
          this.user = value.user
        }
        
      })
  }

  get fetchBlogOnUrl(){
    return this.route.paramMap.pipe(  
      map(params => params.get('id')),
      switchMap( id => {  
       if(id) return this.blogService.fetchBlog(id)
       return of(null)
      }))
  }

}
