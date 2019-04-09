import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildByEmailComponent } from './add-child-by-email.component';

describe('AddChildByEmailComponent', () => {
  let component: AddChildByEmailComponent;
  let fixture: ComponentFixture<AddChildByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChildByEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
