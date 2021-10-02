import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingRequest } from 'src/app/model/model';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';

@Component({
  selector: 'app-user-booking-record',
  templateUrl: './user-booking-record.component.html',
  styleUrls: ['./user-booking-record.component.scss']
})
export class UserBookingRecordComponent implements OnInit {

  constructor(private route: ActivatedRoute,private appService:AppServiceService,private encryptDecrypt:EncryptDecryptService) { }

  bookingDetails:BookingRequest[]=[];
  userId='';
  userBookingDetail:BookingRequest[]=[];

  ngOnInit(): void {
    this.bookingDetails = this.encryptDecrypt.decryptData(this.route.snapshot.data.bookingDetails.data);
    this.userId=this.appService.user.value?.localId!;
    this.userBookingDetail=this.bookingDetails.filter(data=>data.userId===this.userId);

    console.log("user's booking detail",this.userBookingDetail);



  }

  updateBooking(detail:BookingRequest){
    alert("booking update in progress")
  }

  cancelBooking(detail:BookingRequest){
    alert("booking cancel in progress")
  }
}
