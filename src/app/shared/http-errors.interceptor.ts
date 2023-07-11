import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private snack: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response)=> {
    
        const error = response.error
        if(error.errors) { 
          this.snack.open(error.errors[0].msg, "Dismiss", {duration: 5000})
        } else if(error.message)
        { 
          this.snack.open(error.message, "Dismiss", {duration: 5000})
        } else
        {
          this.snack.open('Unexpected Error, try again later', "Dismiss", {duration: 5000})
        }
        
        return throwError(() => new Error(response))
      }));
  }
}
