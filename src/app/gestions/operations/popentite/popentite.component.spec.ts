import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopentiteComponent } from './popentite.component';

describe('PopentiteComponent', () => {
  let component: PopentiteComponent;
  let fixture: ComponentFixture<PopentiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopentiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopentiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
