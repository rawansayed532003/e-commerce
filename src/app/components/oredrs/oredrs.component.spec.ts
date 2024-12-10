import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OredrsComponent } from './oredrs.component';

describe('OredrsComponent', () => {
  let component: OredrsComponent;
  let fixture: ComponentFixture<OredrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OredrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OredrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
