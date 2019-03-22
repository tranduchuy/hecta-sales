import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDetailComponent } from './balance-detail.component';

describe('BalanceDetailComponent', () => {
  let component: BalanceDetailComponent;
  let fixture: ComponentFixture<BalanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
