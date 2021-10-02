import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AppServiceService } from './service/app-service.service';
import { HelperService } from './service/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DreamCar4Rent';
  showLoader=false;

  constructor(private helperService:HelperService,private appService:AppServiceService,private router:Router){

  }

    ngOnInit(){
      this.appService.retainLogin();
      this.helperService.showLoader.subscribe(value=>{
        this.showLoader=value
      })

      this.routerEvents()

    }

    routerEvents() {
      this.router.events.subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.helperService.showLoader.next(true)
            break;
          }
          case event instanceof NavigationEnd: {
            this.helperService.showLoader.next(false)
            break;
          }
          default:
            this.helperService.showLoader.next(false)
            break;
        }
      });
    }

}
