import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProduct } from './navbar-product';

describe('NavbarProduct', () => {
  let component: NavbarProduct;
  let fixture: ComponentFixture<NavbarProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
