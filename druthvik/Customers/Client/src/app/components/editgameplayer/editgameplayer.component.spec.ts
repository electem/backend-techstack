import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgameplayerComponent } from './editgameplayer.component';

describe('EditgameplayerComponent', () => {
  let component: EditgameplayerComponent;
  let fixture: ComponentFixture<EditgameplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditgameplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgameplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
