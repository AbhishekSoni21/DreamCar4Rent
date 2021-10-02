import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppServiceService } from '../service/app-service.service';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class FetchAllBookingDetailsResolver implements Resolve<boolean> {
  constructor(private appService:AppServiceService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // return of(true);
    return this.appService.getAllBookingDetails();
  }
}
