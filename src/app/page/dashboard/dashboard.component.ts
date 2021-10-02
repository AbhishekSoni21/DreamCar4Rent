import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Car, ModelResponse } from 'src/app/model/model';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { carList } from 'src/assets/carList/carList';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  carList: Car[] = [];
  openRequestForm=false;
  selectedCar!:Car;

  carData = carList;

  constructor(
    private appService: AppServiceService,
    private encryptDecrypt: EncryptDecryptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appService
      .getCarList()
      .pipe(map((res) => this.encryptDecrypt.decryptData(res)))
      .subscribe((data) => {
        console.log('car list is', data);
        this.carList = data;
      });
    let uid = this.appService.user.value?.localId;
    this.appService.getUserData(uid!).subscribe(
      (res) => {
        if (!!res) {
          let decryptResponse = this.encryptDecrypt.decryptData(res.data);
          console.log('decrypted user data in view', decryptResponse);
          this.appService.userDetails.next(decryptResponse);
        } else {
          this.router.navigate(['user']);
        }
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  requestBooking(data:Car){
  this.selectedCar=data;
    this.openRequestForm=true;
    var myModal = new bootstrap.Modal(document.getElementById('requestFormPopUP')!)
    myModal.show()
  }

}
