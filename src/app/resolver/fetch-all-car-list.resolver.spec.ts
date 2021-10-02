import { TestBed } from '@angular/core/testing';

import { FetchAllCarListResolver } from './fetch-all-car-list.resolver';

describe('FetchAllCarListResolver', () => {
  let resolver: FetchAllCarListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FetchAllCarListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
