
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { AuthsService } from '../services/auths.service';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private auth: AuthsService,
    private myRoute: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.currentUser() || !this.auth.isAuthorized()) {
      this.myRoute.navigate(["login"]);
    }
    const roles = next.data.roles as Role[];
    if (roles && !roles.some(r => this.auth.hasRole(r))) {
        this.myRoute.navigate(["login"]);
        return false;
    } 
      return true;  
  }
}
@Injectable()
export class ActiveUser implements CanActivate {

  constructor(public router: Router,private auth: AuthsService,){ }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
      if(!this.auth.currentUser()){
         return true
      }else{ this.router.navigate(["parent/my-wondrfly"]);}   
  }
}