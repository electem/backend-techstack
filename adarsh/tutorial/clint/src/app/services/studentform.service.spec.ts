import { TestBed } from '@angular/core/testing';

import { StudentformService } from './studentform.service';

describe('StudentformService', () => {
  let service: StudentformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
