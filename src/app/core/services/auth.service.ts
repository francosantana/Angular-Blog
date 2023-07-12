import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister } from 'src/app/shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, BehaviorSubject} from 'rxjs';
import { User, UserHttpLogin } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  registerObs(user: UserRegister){
    const {email, password} = user
    return this.http.post(environment.apiUrl+'api/v1/user/register', user).pipe(
      tap(()=>{
        this.snack.open("User created", "Dismiss", {duration: 2000})
      }),
    )
  }

  loginObs(user: UserLogin){
    return this.http.post<UserHttpLogin>(environment.apiUrl+'api/v1/user/login', user).pipe(
      tap((response)=>{
        this.user.next(response.data)
        this.snack.open("Loged, redirecting to blogs", "Dismiss", {duration: 2000})
      })
    )
  }
}
