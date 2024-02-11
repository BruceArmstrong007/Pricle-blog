import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormatOptionsComponent } from './input-format-options.component';

describe('InputFormatOptionsComponent', () => {
  let component: InputFormatOptionsComponent;
  let fixture: ComponentFixture<InputFormatOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFormatOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFormatOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
