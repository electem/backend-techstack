import { TestBed } from '@angular/core/testing';

import { PannelserviceService } from './pannelservice.service';

describe('PannelserviceService', () => {
  let service: PannelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PannelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
