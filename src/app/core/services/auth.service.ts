import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, BehaviorSubject, map, of , Observable} from 'rxjs';

//types 
import { User, UserHttpLogin, 
        UserListHttpLogin, UserLoginParam, 
        UserRegisterParam, JwtUser } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<JwtUser | null>(null)

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  registerObs(user: UserRegisterParam){
    const {email, password} = user
    return this.http.post(environment.apiUrl+'api/v1/user/register', user).pipe(
      tap(()=>{
        this.snack.open("User created", "Dismiss", {duration: 2000})
      }),
    )
  }

  loginObs(user: UserLoginParam){
    return this.http.post<UserHttpLogin>(environment.apiUrl+'api/v1/user/login', user).pipe(
      tap((response)=>{
        this.user.next(response.data)
        this.snack.open("Loged, redirecting to blogs", "Dismiss", {duration: 2000})
      })
    )
  }

  getUser(id: string) : Observable<User | null> {
    if(!this.user.value){
      return of(null)
    }
    return this.http.get<UserListHttpLogin>(environment.apiUrl + 'api/v1/user/list').pipe(
      map(
        users => users.data.find(obj => obj._id == id) as  User
      ),
    )
  }
}
