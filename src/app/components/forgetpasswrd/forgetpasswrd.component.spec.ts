import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswrdComponent } from './forgetpasswrd.component';

describe('ForgetpasswrdComponent', () => {
  let component: ForgetpasswrdComponent;
  let fixture: ComponentFixture<ForgetpasswrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetpasswrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetpasswrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
