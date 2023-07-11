import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister } from 'src/app/shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  registerObs(user: UserRegister){
    return this.http.post(environment.apiUrl+'api/v1/user/register', user).pipe(
      tap(()=>{
        this.loginObs({email: user.email, password: user.password}).subscribe()
      })
    )
  }

  loginObs(user: UserLogin){
    return this.http.post(environment.apiUrl+'api/v1/user/login', user).pipe(
      tap(()=>{
        this.snack.open("Loged, redirecting to blogs", "Dismiss", {duration: 2000})
        // TODO: Store JWT in state/cookie
      })
    )
  }
}
