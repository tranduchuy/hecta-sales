import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalePostComponent } from './list-sale-post.component';

describe('ListSalePostComponent', () => {
  let component: ListSalePostComponent;
  let fixture: ComponentFixture<ListSalePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
