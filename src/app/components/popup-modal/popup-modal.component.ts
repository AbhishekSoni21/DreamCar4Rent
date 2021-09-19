import { Component, Input, OnInit } from '@angular/core';
import { ModelResponse } from 'src/app/model/model';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit {

  @Input()model!:ModelResponse
  constructor() { }

  ngOnInit(): void {
  }

}
