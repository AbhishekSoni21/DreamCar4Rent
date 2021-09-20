import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private appService:AppServiceService,private encryptDecrypt:EncryptDecryptService) { }

  ngOnInit(): void {
    this.appService.getCarList().pipe(map(res=>this.encryptDecrypt.decryptData(res))).subscribe(data=>{
      console.log("car list is",data);
      // th


    })
  }

}
