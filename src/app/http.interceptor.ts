import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppServiceService } from './service/app-service.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appService:AppServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.appService.user.pipe(take(1),exhaustMap(user=>{
      let modReq= request.clone({
        params:new HttpParams().set('auth',user?.idToken!)
      })
      return next.handle(modReq);
    }))
  }
}
