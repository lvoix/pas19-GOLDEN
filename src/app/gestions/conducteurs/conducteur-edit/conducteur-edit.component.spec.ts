import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurEditComponent } from './conducteur-edit.component';

describe('ConducteurEditComponent', () => {
  let component: ConducteurEditComponent;
  let fixture: ComponentFixture<ConducteurEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConducteurEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConducteurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
