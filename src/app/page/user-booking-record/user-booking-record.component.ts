import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingRequest, Car, ModelResponse } from 'src/app/model/model';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import * as bootstrap from 'bootstrap';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-user-booking-record',
  templateUrl: './user-booking-record.component.html',
  styleUrls: ['./user-booking-record.component.scss']
})
export class UserBookingRecordComponent implements OnInit {
  dataObj: ModelResponse={} as ModelResponse;

  constructor(private route: ActivatedRoute,private appService:AppServiceService,private encryptDecrypt:EncryptDecryptService) { }

  bookingDetails:BookingRequest[]=[];
  userId='';
  userBookingDetail:BookingRequest[]=[];
  openRequestForm=false;
  selectedBooking!:BookingRequest;
  requestType='';
  carData:Car[]=[];
  currentCar:Car={} as Car;

  ngOnInit(): void {
    this.bookingDetails = this.encryptDecrypt.decryptData(this.route.snapshot.data.bookingDetails.data);
    this.userId=this.appService.user.value?.localId!;
    this.userBookingDetail=this.bookingDetails.filter(data=>data.userId===this.userId);

    console.log("user's booking detail",this.userBookingDetail);
    this.appService.getCarList().pipe(map(res=>this.encryptDecrypt.decryptData(res))).subscribe(response=>{
      this.carData=response;

    })


  }

  updateBooking(detail:BookingRequest,type:string){
    alert("booking update in progress")
    this.selectedBooking=detail;
    this.openRequestForm=true;
    this.currentCar=this.carData.filter(res=>res.carId===detail?.carId)[0]
    this.requestType=type;
    var myModal = new bootstrap.Modal(document.getElementById('requestFormPopUP')!)
    myModal.show()
  }

  cancelBooking(detail:BookingRequest){
    alert("booking cancel in progress")
    this.bookingDetails.forEach(data=>{
     if(data.bookingId===detail.bookingId){
       data.status='Cancelled',
       data.cancelledOn=new Date().toISOString().slice(0,10)
     }
    })
    this.appService.updateAllBookingDetails(this.encryptDecrypt.encryptData(this.bookingDetails)).subscribe(res=>{
      document.querySelectorAll<HTMLElement>('[data-bs-dismiss="modal"]')[0].click()

      let dataObj={
        title:'Booking Cancelled',
        message:`Booking request with Id ${detail.bookingId} is cancelled successfully.Any amount paid will be refunded within 2-3 working days.`,
        status:'success'
      };
      this.handleSucessFullBooking(dataObj);
  })

}
  filterResult(value:any){
    console.log("asda",value);
    let searchParam=value;
    searchParam = searchParam.toString().toLowerCase()
    this.userBookingDetail=this.userBookingDetail.filter(data=>data.bookingId.toLowerCase() === searchParam || data.status.toLowerCase() === searchParam)

  }

  handleSucessFullBooking(data:ModelResponse){
    var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
    myModal.show();
    this.dataObj=data
  }
}
