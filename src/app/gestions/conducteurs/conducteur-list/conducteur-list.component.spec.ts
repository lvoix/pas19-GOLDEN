import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurListComponent } from './conducteur-list.component';

describe('ConducteurListComponent', () => {
  let component: ConducteurListComponent;
  let fixture: ComponentFixture<ConducteurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConducteurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConducteurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
