import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn=false;
  constructor(private appService:AppServiceService) {  }

  ngOnInit(): void {
    this.appService.user.subscribe(res=>{
      if(res){
        this.loggedIn=true
      }else{
        this.loggedIn=false
      }
    })
  }

}
