import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TimelineStore } from './timeline.store';
import { NgFor } from '@angular/common';
import { TimelinePostsComponent } from './components/timeline-posts/timeline-posts.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, TimelinePostsComponent],
  providers: [TimelineStore],
  templateUrl: './timeline.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimelineComponent {
  readonly state = inject(TimelineStore);

  constructor() {
    this.loadPosts();
  }

  selectedPost(postID: string) {
    this.state.selectedPost(postID);
  }

  loadPosts(page?: number, pageSize?: number) {
    this.state.timelinePosts({
      page: page ? page : this.state.page(),
      pageSize: pageSize ? pageSize : this.state.pageSize(),
    });
  }

  loadOnScroll(event: Event) {
    const container = event.target as any;
    const isScrolledToBottom =
      container.scrollHeight - container.clientHeight <=
      container.scrollTop + 1;
    if (isScrolledToBottom && !this.state.scrolledtoBottom()) {
      setTimeout(() => {
      this.state.scrolledToBottomState(true);
      },1000);
      this.state.refreshState(true);
      this.loadPosts(this.state.page());
    } else {
      setTimeout(() => {
        this.state.scrolledToBottomState(false);
      }, 3000)
    }
  }
}

export default TimelineComponent;
