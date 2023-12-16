import { ComponentFixture, TestBed } from '@angular/core/testing';

import ContactSkeletonComponent from './contact-skeleton.component';

describe('ContactSkeletonComponent', () => {
  let component: ContactSkeletonComponent;
  let fixture: ComponentFixture<ContactSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
