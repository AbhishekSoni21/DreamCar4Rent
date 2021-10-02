import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingRecordComponent } from './user-booking-record.component';

describe('UserBookingRecordComponent', () => {
  let component: UserBookingRecordComponent;
  let fixture: ComponentFixture<UserBookingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
