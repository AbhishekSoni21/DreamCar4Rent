import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFormModalComponent } from './booking-form-modal.component';

describe('BookingFormModalComponent', () => {
  let component: BookingFormModalComponent;
  let fixture: ComponentFixture<BookingFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
