import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authS = inject(AuthService)
  if(authS.isAuth()){
    if(isTokenExpired()){
      authS.logout()
      return false
    }
    if(!authS.isAdmin()){
      router.navigate(['/forbidden'])
      return false
    }
    return true
  }
  inject(Router).navigate(['/login'])
  return false;
};

const isTokenExpired = () => {
  const authS = inject(AuthService)
  const token = authS.token
  const payload = authS .getPayload(token)
  const exp =  payload.exp;
  const now = new Date().getTime() / 1000
  if(now > exp) {
    return true
  }
  return false
}
