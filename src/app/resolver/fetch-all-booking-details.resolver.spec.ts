import { TestBed } from '@angular/core/testing';

import { FetchAllBookingDetailsResolver } from './fetch-all-booking-details.resolver';

describe('FetchAllBookingDetailsResolver', () => {
  let resolver: FetchAllBookingDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FetchAllBookingDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
