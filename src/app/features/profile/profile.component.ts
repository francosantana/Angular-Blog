import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {switchMap, of, tap} from 'rxjs'

import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/shared/models/blog.model';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule, MatButtonModule]
})
export class ProfileComponent implements OnInit {
  userBlogs: Blog[] | null = null;

  constructor(public authService: AuthService,public blogService: BlogService){ }

  ngOnInit(): void {
    this.updateBlogs.subscribe()
   }


    deleteBlog(id: string){
      this.blogService.deleteBlog(id).subscribe(
        ()=> this.updateBlogs.subscribe()
      )
    }

    updateBlogs = this.authService.user.pipe(
      switchMap(
        user => {
          if(user) return this.blogService.fetchUserBlogs(user._id)
          return of(null)
        }),
        tap(
          blogs => this.userBlogs = blogs
        ))
}
