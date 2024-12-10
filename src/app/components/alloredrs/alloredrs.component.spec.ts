import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloredrsComponent } from './alloredrs.component';

describe('AlloredrsComponent', () => {
  let component: AlloredrsComponent;
  let fixture: ComponentFixture<AlloredrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlloredrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlloredrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
