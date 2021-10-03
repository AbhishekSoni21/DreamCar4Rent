import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppServiceService } from '../service/app-service.service';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userId='';
  constructor(private appService:AppServiceService,private encryptDecrypt:EncryptDecryptService,private router:Router){
    this.userId=this.appService.user.value?.localId!;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.isAdmin()

    return this.appService.isAdmin.value?this.appService.isAdmin.value:this.router.createUrlTree([''])
  }

  isAdmin():any{
   return this.appService.getAdminList().pipe(map(res=>this.encryptDecrypt.decryptData(res))).subscribe(
      res=>{
        let adminList=res.data;
        adminList.forEach((element: string | undefined) => {
          if(element===this.userId){
            // this.router.navigate(['admin'])
            return true;
          }
          else{
            return this.router.createUrlTree([''])
          }
        });
      },err=>{
        this.router.navigate(['login'])
      }
    )
  }

}
