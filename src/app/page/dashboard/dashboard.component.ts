import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private appService:AppServiceService) { }

  ngOnInit(): void {
    this.appService.getCarList().subscribe(data=>{
      console.log("car list is",data);

    })
  }

}
