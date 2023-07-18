import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthService } from './core/services/auth.service';
import { HttpErrorsInterceptor } from './shared/interceptors/http-errors.interceptor';
import { HttpAuthInterceptor } from './shared/interceptors/http-auth.interceptor';

//Mui
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export function initAuth(authService: AuthService) {
  return ()=> (authService.getJWt? authService.getProfile() : null)
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initAuth,deps: [AuthService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
