import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { RouterModule } from '@angular/router';

import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { TimePipe } from 'src/app/shared/pipes/time.pipe';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, TimePipe, MatButtonModule, MatIconModule, RouterModule],
})
export class BlogsComponent implements OnInit{
  blogs: [Blog] | null = null

  constructor (public blogService: BlogService){}

  ngOnInit(): void {
    this.blogService.getObs.pipe(tap(
      (response)=>{
        this.blogs = response.data
      }
    )).subscribe()
  }


}
