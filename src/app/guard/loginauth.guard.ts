import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppServiceService } from '../service/app-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {
  constructor(private appService:AppServiceService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appService.user.pipe(take(1),map(res=>{
      if(res){
        return this.router.createUrlTree(['dashboard'])
        // return false
      }else{
        return true
      }
        }))
      }

}
