import { TestBed } from '@angular/core/testing';

import { SelllerGuard } from './selller.guard';

describe('SelllerGuard', () => {
  let guard: SelllerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelllerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
