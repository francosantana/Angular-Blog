import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserLoginParam } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports:[
    MatFormFieldModule , MatInputModule, MatIconModule, MatButtonModule,
    FormsModule, ReactiveFormsModule

  ]
})
export class LoginComponent {
  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private authService: AuthService, private router: Router){}

  login(){
    if(!this.loginForm.valid) return
    this.authService.loginObs(this.loginForm.value as UserLoginParam).pipe(tap(
      ()=>{this.router.navigate(['/create'])}
    )).subscribe()
  }
}
