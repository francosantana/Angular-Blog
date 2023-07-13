import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogCreate } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone: true,
  imports: [MatInputModule, MatButtonModule, 
           FormsModule, ReactiveFormsModule]
})
export class CreateComponent {

  createForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(8)]),
    description: new FormControl('', [Validators.required, Validators.minLength(200)]),
    image: new FormControl('', [Validators.required])
  })

  constructor(private blogService: BlogService){  }

  create(){
    if(!this.createForm.valid) return
    this.blogService.createObs(this.createForm.value as BlogCreate).subscribe()
  }

}
