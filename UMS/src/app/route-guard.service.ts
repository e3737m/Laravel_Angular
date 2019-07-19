import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private router: Router, private auth: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    /*
    this.router.navigate(['users']);
    return false; */

    if(this.auth.isUserLoggedIn())
    {
      return true;
    }else{
      this.router.navigate(['login']);
    }
  }
}
