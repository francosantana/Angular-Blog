import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { map, switchMap, of} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// types
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogWithUser } from 'src/app/shared/models/blog.model';

// Mat
import {MatDividerModule} from '@angular/material/divider';

@UntilDestroy()
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [CommonModule, MatDividerModule]
})
export class BlogComponent {
  
  // On url param changeSet a observable that return the blog with 
  // the user
  blog: Observable<BlogWithUser | null> = this.route.paramMap.pipe(  
    map(params => params.get('id')),
    switchMap( id => {  
     if(id) return this.blogService.fetchBlog(id)
     return of(null)
    }),
    untilDestroyed(this))

  constructor(
    private route: ActivatedRoute, 
    private blogService: BlogService){}

}
