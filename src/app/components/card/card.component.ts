import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/model/model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  selectedCar!: Car;
  openRequestForm=false;
  constructor() { }

  @Input('cardData') carData={} as Car
  @Output()handlerequestBooking=new EventEmitter();

  ngOnInit(): void {

    console.log("this.car",this.carData);

  }

  requestBooking(data:Car){
    this.handlerequestBooking.emit(data)
  }

}
