import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import {jwtDecode } from 'jwt-decode'

export const authGuard: CanActivateFn = (route, state) => {
  
  const cookieService = inject(CookieService);
  const authService = inject(AuthService)
  const router = inject(Router);
  const user = authService.getUser();
  //check for JWT token
  let token = cookieService.get('Authorization');

  if(token && user){
    token = token.replace('Bearer','');
    const decodedToken: any = jwtDecode(token);

    //check token is expired?
    const expiritionDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if(expiritionDate < currentTime)
    {
      //Logout
      authService.logout();
      return router.createUrlTree(['/login'], {queryParams:{returnUrl: state.url}})
    }
    else
    {
      //Token is still valid
      if(user.roles.includes('Writer'))
      {
        return true;
      }
      else{
        alert('UnAuthorized');
        return false;
      }
    }
  }
  else{
    //Logout
    authService.logout();
    return router.createUrlTree(['/login'], {queryParams:{returnUrl: state.url}})
  }
};
