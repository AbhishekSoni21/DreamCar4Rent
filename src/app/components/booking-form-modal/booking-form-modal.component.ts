import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BookingRequest, Car, ModelResponse } from 'src/app/model/model';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-booking-form-modal',
  templateUrl: './booking-form-modal.component.html',
  styleUrls: ['./booking-form-modal.component.scss']
})
export class BookingFormModalComponent implements OnInit,OnChanges {

  constructor(private appService:AppServiceService,private encryptDecrypt:EncryptDecryptService) { }
  @Input()show=false;
  @Input()booking!:BookingRequest;
  @Input()type!:string;
  bookingRequestForm!:FormGroup;

  @Input()bookingList:BookingRequest[]=[];
  @Input()currentCarDetail:Car={} as Car;
  dataObj:ModelResponse={} as ModelResponse;
  bookingAmount=0;
  ngOnInit(): void {
    this.bookingRequestForm=new FormGroup({
      bookingDate:new FormControl({value:this?.booking?.bookingDate,disabled:true},[Validators.required]),
      bookingFromDate:new FormControl(this?.booking?.bookingFromDate,[Validators.required]),
      noOfDays:new FormControl(this?.booking?.noOfDays,[Validators.required,Validators.max(30)]),
      comments:new FormControl(this?.booking?.comments,[Validators.max(300)]),
      carBrand:new FormControl({value:this.currentCarDetail.brand,disabled:true},[Validators.max(300)]),
      carModel:new FormControl({value:this.currentCarDetail.model,disabled:true},[Validators.max(300)]),
      cancelDate:new FormControl({value:this?.booking?.cancelledOn,disabled:true}),
      adminComment:new FormControl({value:this?.booking?.adminComment,disabled:true},[Validators.max(300)]),
    })
  }

  ngOnChanges(){
    this.bookingRequestForm=new FormGroup({
      bookingDate:new FormControl({value:this?.booking?.bookingDate,disabled:true},[Validators.required]),
      bookingFromDate:new FormControl(this?.booking?.bookingFromDate,[Validators.required]),
      noOfDays:new FormControl(this?.booking?.noOfDays,[Validators.required,Validators.max(30)]),
      comments:new FormControl(this?.booking?.comments,[Validators.max(300)]),
      carBrand:new FormControl({value:this.currentCarDetail.brand,disabled:true},[Validators.max(300)]),
      carModel:new FormControl({value:this.currentCarDetail.model,disabled:true},[Validators.max(300)]),
      cancelDate:new FormControl({value:this?.booking?.cancelledOn,disabled:this.type.toLowerCase()==='cancelled'}),
      adminComment:new FormControl({value:this?.booking?.adminComment,disabled:this.type.toLowerCase()==='cancelled'},[Validators.max(300)]),

    })
  }

  getControl(value: string): boolean | undefined {
    return (
      this.bookingRequestForm.get(value)?.touched && !this.bookingRequestForm.get(value)?.valid
    );
  }

  onDateChange(e: any) {
    let optedDate = new Date(e.target.value).getTime();
    let currentDate = new Date().getTime();

    if (optedDate < currentDate && new Date(e.target.value).toLocaleDateString()!==new Date().toLocaleDateString()) {
      this.bookingRequestForm.get('bookingFromDate')?.setErrors({ valid: false });
    } else {
      this.bookingRequestForm.get('bookingFromDate')?.updateValueAndValidity();
    }
  }

  handleSubmit(){
    let currentBooking:BookingRequest=this.bookingRequestForm.value;
    currentBooking.carId=this.booking.carId;
    currentBooking.userId=this.appService.user.value?.localId!;
    currentBooking.bookingAmount=(+this.bookingRequestForm.value['noOfDays']*+this.currentCarDetail.rentPrice + (+this.bookingRequestForm.value['noOfDays']*+this.currentCarDetail.rentPrice )*0.3 + (+this.bookingRequestForm.value['noOfDays']*+this.currentCarDetail.rentPrice  *0.05))
    .toString();
    currentBooking.status='pending';
    currentBooking.bookingId=this.booking.bookingId;
    this.bookingList.forEach(data=>{
      if(data.bookingId===currentBooking.bookingId){
        data.bookingFromDate=currentBooking.bookingFromDate;
        data.noOfDays=currentBooking.noOfDays;
        data.comments=currentBooking.comments;
        data.bookingAmount=currentBooking.bookingAmount;
        data.bookingDate=new Date().toISOString().slice(0,10)
      }
    })
    this.appService.updateAllBookingDetails(this.encryptDecrypt.encryptData(this.bookingList)).subscribe(res=>{
      document.querySelectorAll<HTMLElement>('[data-bs-dismiss="modal"]')[0].click()

      let dataObj={
        title:'Success',
        message:`Booking request with Id ${this.booking.bookingId} is updated successfully.Please wait till your booking is confirmed.`,
        status:'success'
      };
      this.handleSucessFullBooking(dataObj);

    })


}

handleSucessFullBooking(data:ModelResponse){
  var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
  myModal.show();
  this.dataObj=data
}

calculateBookingAmount(){
  let noOfDays=this.bookingRequestForm.value['noOfDays'];
  if(!!noOfDays){
    this.bookingAmount=+noOfDays*+this.currentCarDetail.rentPrice

  }
  else{
    this.bookingAmount=0;
  }
}
}
