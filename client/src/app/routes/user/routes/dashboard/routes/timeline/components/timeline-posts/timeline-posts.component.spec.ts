import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePostsComponent } from './timeline-posts.component';

describe('TimelinePostsComponent', () => {
  let component: TimelinePostsComponent;
  let fixture: ComponentFixture<TimelinePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinePostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelinePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
