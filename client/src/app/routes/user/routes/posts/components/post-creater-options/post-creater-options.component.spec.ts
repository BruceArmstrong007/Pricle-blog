import { ComponentFixture, TestBed } from '@angular/core/testing';

import PostCreaterOptionsComponent from './post-creater-options.component';

describe('PostCreaterOptionsComponent', () => {
  let component: PostCreaterOptionsComponent;
  let fixture: ComponentFixture<PostCreaterOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCreaterOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreaterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
