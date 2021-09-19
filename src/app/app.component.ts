import { Component, OnInit } from '@angular/core';
import { HelperService } from './service/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DreamCar4Rent';
  showLoader=false;

  constructor(private helperService:HelperService){

  }

    ngOnInit(){
      this.helperService.showLoader.subscribe(value=>{
        this.showLoader=value
      })

    }


}
