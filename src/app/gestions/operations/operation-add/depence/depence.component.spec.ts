import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenceComponent } from './depence.component';

describe('DepenceComponent', () => {
  let component: DepenceComponent;
  let fixture: ComponentFixture<DepenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
