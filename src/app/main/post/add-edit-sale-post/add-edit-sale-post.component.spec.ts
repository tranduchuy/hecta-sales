import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSalePostComponent } from './add-edit-sale-post.component';

describe('AddEditSalePostComponent', () => {
  let component: AddEditSalePostComponent;
  let fixture: ComponentFixture<AddEditSalePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSalePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSalePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
