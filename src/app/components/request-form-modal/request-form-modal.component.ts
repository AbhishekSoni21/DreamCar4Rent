import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BookingRequest, Car, ModelResponse } from 'src/app/model/model';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-request-form-modal',
  templateUrl: './request-form-modal.component.html',
  styleUrls: ['./request-form-modal.component.scss']
})
export class RequestFormModalComponent implements OnInit {

  constructor(private appService:AppServiceService,private encryptDecrypt:EncryptDecryptService) { }

  @Input()show=false;
  @Input()car!:Car;
  bookingDetailsList:BookingRequest[]=[];
  bookingForm!:FormGroup;
  bookingAmount=0;
  dataObj:ModelResponse={} as ModelResponse;
  bookingId="10009991";
  nextBookingId='';


  ngOnInit(): void {
    let todaysDate=new Date().toISOString().slice(0,10).toString()
    this.bookingForm=new FormGroup({
      bookingFromDate:new FormControl(todaysDate,[Validators.required]),
      noOfDays:new FormControl(1,[Validators.required,Validators.max(30)]),
      comments:new FormControl('',[Validators.max(300)])
    })

    this.appService.getAllBookingDetails().pipe(map((res)=>this.encryptDecrypt.decryptData(res.data))).subscribe(response=>{
      this.bookingDetailsList=response===''?[]:response;
      if(this.bookingDetailsList.length===0){
        this.nextBookingId=(+this.bookingId+1).toString();
      }
      else{
        if(this.bookingDetailsList[this.bookingDetailsList.length-1].bookingId)
          {
            this.nextBookingId=(+this.bookingDetailsList[this.bookingDetailsList.length-1].bookingId+1).toString()
          }else{
            this.nextBookingId=(+new Date().getTime()+1).toString();
          }
        }
    });

  }

  getControl(value: string): boolean | undefined {
    return (
      this.bookingForm.get(value)?.touched && !this.bookingForm.get(value)?.valid
    );
  }

  onDateChange(e: any) {
    let optedDate = new Date(e.target.value).getTime();
    let currentDate = new Date().getTime();

    if (optedDate < currentDate && new Date(e.target.value).toLocaleDateString()!==new Date().toLocaleDateString()) {
      this.bookingForm.get('bookingFromDate')?.setErrors({ valid: false });
    } else {
      this.bookingForm.get('bookingFromDate')?.updateValueAndValidity();
    }
  }

  handleSubmit(){
    let currentBooking:BookingRequest=this.bookingForm.value;
    currentBooking.carId=this.car.carId;
    currentBooking.userId=this.appService.user.value?.localId!;
    currentBooking.bookingAmount=(+this.bookingForm.value['noOfDays']*+this.car.rentPrice).toString();
    currentBooking.status='pending';
    currentBooking.bookingId=this.nextBookingId;
    this.bookingDetailsList.push(currentBooking)
    this.appService.updateAllBookingDetails(this.encryptDecrypt.encryptData(this.bookingDetailsList)).subscribe(res=>{
      document.querySelectorAll<HTMLElement>('[data-bs-dismiss="modal"]')[0].click()

      let dataObj={
        title:'Success',
        message:`Booking request with Id ${this.nextBookingId} is placed successfully.Please wait till your booking is confirmed.`,
        status:'success'
      };
      this.handleSucessFullBooking(dataObj);

    })
  }

  calculateBookingAmount(){
    let noOfDays=this.bookingForm.value['noOfDays'];
    if(!!noOfDays){
      this.bookingAmount=+noOfDays*+this.car.rentPrice

    }
    else{
      this.bookingAmount=0;
    }
  }

  handleSucessFullBooking(data:ModelResponse){
    var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
    myModal.show();
    this.dataObj=data
  }
}
