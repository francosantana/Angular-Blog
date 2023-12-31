import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadComponent: ()=> import("../features/auth/auth.component").then((m)=>m.AuthComponent),
    canActivate: [authGuard("denied")]
  },
  {
    path: 'create',
    loadComponent: ()=> import("../features/blogs/create/create.component").then((m)=>m.CreateComponent),
    canActivate: [authGuard("required")]
  },
  {
    path: 'blogs',
    loadComponent: ()=> import("../features/blogs/blogs/blogs.component").then((m)=>m.BlogsComponent),
  },
  {
    path: 'blog/:id',
    loadComponent: ()=> import("../features/blogs/blog/blog.component").then((m)=>m.BlogComponent),
  },
  {
    path: 'profile',
    loadComponent: ()=> import("../features/profile/profile.component").then((m)=>m.ProfileComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
