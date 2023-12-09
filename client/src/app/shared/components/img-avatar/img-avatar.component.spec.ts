import { ComponentFixture, TestBed } from '@angular/core/testing';

import ImgAvatarComponent from './img-avatar.component';

describe('ImgAvatarComponent', () => {
  let component: ImgAvatarComponent;
  let fixture: ComponentFixture<ImgAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
