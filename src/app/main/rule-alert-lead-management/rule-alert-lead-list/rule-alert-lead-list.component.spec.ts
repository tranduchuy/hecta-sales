import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleAlertLeadListComponent } from './rule-alert-lead-list.component';

describe('RuleAlertLeadListComponent', () => {
  let component: RuleAlertLeadListComponent;
  let fixture: ComponentFixture<RuleAlertLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleAlertLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleAlertLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
