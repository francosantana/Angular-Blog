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
      this.fetchUserOnChange.subscribe(result => {
        if(result){
          this.blog = result.data
          this.authService.getUser(result.data.author).subscribe(
            response => {
              if(response)
              this.user = response
            }
          )
        } else  {
          this.blog = null
        }
      })
  }

  // .map() -> get the param from the url
  // .switch -> on url param changes, we suscribe to the http observable and return everything as one observable
  get fetchUserOnChange(){
    return this.route.paramMap.pipe(  
      map(params => params.get('id')),
      switchMap( id => {  
       if(id) return this.blogService.getUnique(id)
       return of(null)
      }))
  }

}
