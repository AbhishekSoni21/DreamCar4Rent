import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppServiceService } from '../service/app-service.service';

@Injectable({
  providedIn: 'root'
})
export class FetchAllCarListResolver implements Resolve<boolean> {
  constructor(private appService:AppServiceService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.appService.getCarList();
  }
}
