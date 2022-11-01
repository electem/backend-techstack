import { TestBed } from '@angular/core/testing'

import { CourceService } from './cource.service'

describe('CourceService', () => {
  let service: CourceService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CourceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
