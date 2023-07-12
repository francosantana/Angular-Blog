import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

export const authGuard = (type: 'denied' | 'required'): CanActivateFn => {
  return function () {
    const authService = inject(AuthService)
    const routerService = inject(Router)
    
    const user = authService.user.value

    if(user && type == 'denied'){
      routerService.navigate(['/create'])
    }

    if(!user && type == 'required'){
      routerService.navigate(['/auth'])
    }

    return true;
  };
}
