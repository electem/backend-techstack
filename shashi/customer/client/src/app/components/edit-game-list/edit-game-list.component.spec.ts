import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGameListComponent } from './edit-game-list.component';

describe('EditGameListComponent', () => {
  let component: EditGameListComponent;
  let fixture: ComponentFixture<EditGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
