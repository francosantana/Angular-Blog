import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = this.authService.getJWt
    if(jwt){
      return next.handle(
        request.clone({
          setHeaders:{
            "Authorization": 'Bearer ' + jwt
          }
        })
      );
    }
    return next.handle(request);
  }
}
