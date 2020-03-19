import { TestBed } from '@angular/core/testing';

import { StateObserverService } from './state-observer.service';

describe('StateObserverService', () => {
  let service: StateObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
