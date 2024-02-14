import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import ButtonComponent from '../../../../../../../../shared/components/button/button.component';
import CardComponent from '../../../../../../../../shared/components/card/card.component';
import EmptyComponent from '../../../../../../../../shared/components/empty/empty.component';
import ImgAvatarComponent from '../../../../../../../../shared/components/img-avatar/img-avatar.component';
import LoaderComponent from '../../../../../../../../shared/components/loader/loader.component';
import { CheckUserByIDPipe } from '../../../search/pipes/check-user-by-id.pipe';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../../../../../../../../stores/posts/posts.model';

@Component({
  selector: 'app-timeline-posts',
  standalone: true,
  imports: [
    NgFor,
    PostCardComponent,
    CheckUserByIDPipe,
    ButtonComponent,
    ImgAvatarComponent,
    CardComponent,
    EmptyComponent,
    LoaderComponent,
  ],
  templateUrl: './timeline-posts.component.html',
  styles: `
  .height {
    height: calc(100vh - 130px);
  }
  loader {
    --loader-font-size: 3rem;
    --loader-line-height: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePostsComponent {
  posts = input.required<Post[]>();
  refresh = input.required<boolean>();
  isLoading = input<boolean>();
  clickedID = input<string>();
  @Output() selectEvent = new EventEmitter<string>();
  @Output() scrollEvent = new EventEmitter<Event>();
}
