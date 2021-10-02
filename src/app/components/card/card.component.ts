import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/model/model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input('cardData') carData={} as Car

  ngOnInit(): void {

    console.log("this.car",this.carData);

  }

  requestBooking(data:Car){
console.log("CAR DATA",data);

  }

}
