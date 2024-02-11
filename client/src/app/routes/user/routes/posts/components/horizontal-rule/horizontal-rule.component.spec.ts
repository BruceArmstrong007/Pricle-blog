import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalRuleComponent } from './horizontal-rule.component';

describe('HorizontalRuleComponent', () => {
  let component: HorizontalRuleComponent;
  let fixture: ComponentFixture<HorizontalRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalRuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
