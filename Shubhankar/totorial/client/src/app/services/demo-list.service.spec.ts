import { TestBed } from '@angular/core/testing';

import { DemoListService } from './demo-list.service';

describe('DemoListService', () => {
  let service: DemoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
