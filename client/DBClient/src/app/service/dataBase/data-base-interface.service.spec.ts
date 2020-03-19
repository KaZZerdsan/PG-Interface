import { TestBed } from '@angular/core/testing';

import { DataBaseInterfaceService } from './data-base-interface.service';

describe('DataBaseInterfaceService', () => {
  let service: DataBaseInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
