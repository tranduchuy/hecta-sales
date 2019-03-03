import { TestBed } from '@angular/core/testing';

import { RuleAlertLeadService } from './rule-alert-lead.service';

describe('RuleAlertLeadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleAlertLeadService = TestBed.get(RuleAlertLeadService);
    expect(service).toBeTruthy();
  });
});
