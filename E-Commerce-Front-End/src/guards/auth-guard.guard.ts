import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    if (username !== null) {
      if(role==='Buyer'){
        return true;
      }else{
        this.router.navigate(['/unauthorizedPage']);
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login page or any other page you want
      return false;
    }
  }

}
