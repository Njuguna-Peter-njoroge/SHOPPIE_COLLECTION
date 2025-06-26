import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageCompoenent } from './user-page.compoenent';

describe('UserPageCompoenent', () => {
  let component: UserPageCompoenent;
  let fixture: ComponentFixture<UserPageCompoenent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageCompoenent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPageCompoenent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
