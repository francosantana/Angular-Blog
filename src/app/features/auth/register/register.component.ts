import { Component } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserRegisterParam } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
  styleUrls: ['./register.component.css'],
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    FormsModule, ReactiveFormsModule
  ],
  standalone: true,
  
})
export class RegisterComponent  {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor( private authService: AuthService){}

  register(){
    if(!this.registerForm.valid) return
    this.authService.registerObs(this.registerForm.value as UserRegisterParam).subscribe()
  }





}
