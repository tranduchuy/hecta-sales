import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRuleAlertLeadComponent } from './add-rule-alert-lead.component';

describe('AddRuleAlertLeadComponent', () => {
  let component: AddRuleAlertLeadComponent;
  let fixture: ComponentFixture<AddRuleAlertLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRuleAlertLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRuleAlertLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
