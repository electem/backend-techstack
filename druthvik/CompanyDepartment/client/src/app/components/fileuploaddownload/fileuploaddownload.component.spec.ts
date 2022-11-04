import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploaddownloadComponent } from './fileuploaddownload.component';

describe('FileuploaddownloadComponent', () => {
  let component: FileuploaddownloadComponent;
  let fixture: ComponentFixture<FileuploaddownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileuploaddownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploaddownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
