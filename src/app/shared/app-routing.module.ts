import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadComponent: ()=> import("../features/auth/auth.component").then((m)=>m.AuthComponent)
  },
  {
    path: 'create',
    loadComponent: ()=> import("../features/blogs/create/create.component").then((m)=>m.CreateComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
