import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialListComponent } from './financial-list.component';

describe('FinancialListComponent', () => {
  let component: FinancialListComponent;
  let fixture: ComponentFixture<FinancialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
