import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductService } from './admin-product-service';

describe('AdminProductService', () => {
  let component: AdminProductService;
  let fixture: ComponentFixture<AdminProductService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
