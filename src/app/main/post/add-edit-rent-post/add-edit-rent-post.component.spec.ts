import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRentPostComponent } from './add-edit-rent-post.component';

describe('AddEditRentPostComponent', () => {
  let component: AddEditRentPostComponent;
  let fixture: ComponentFixture<AddEditRentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
