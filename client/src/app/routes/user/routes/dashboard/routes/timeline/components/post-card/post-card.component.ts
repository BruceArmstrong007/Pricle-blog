import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import CardComponent from '../../../../../../../../shared/components/card/card.component';
import ImgAvatarComponent from '../../../../../../../../shared/components/img-avatar/img-avatar.component';
import { Post } from '../../../../../../../../stores/posts/posts.model';
import { TimenowPipe } from '../../../../../../../../shared/pipes/timenow/timenow.pipe';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [NgIf, NgFor, CardComponent, ImgAvatarComponent, TimenowPipe],
  template: `
    <app-card class="w-full">
      <ng-container ngProjectAs="body">
        <div class="w-full flex justify-between items-center">
          <div class="flex gap-4">
            <avatar
              class="pointer"
              [url]="post()?.author?.profile?.url ?? null"
            />
            <section class="flex flex-col gap-1">
              @if( post()?.author?.name) {
              <div class="text-xs">{{ post()?.author?.name }}</div>
              } @else {
              <div
                class="text-xs w-52 h-4 animate:pulse rounded bg-slate-400"
              ></div>
              } @if(post()?.author?.username) {
              <div class="text-xs">{{ '@' + post()?.author?.username }}</div>
              } @else {
              <div
                class="text-xs w-36 h-4 animate:pulse rounded bg-slate-400"
              ></div>
              }
            </section>
          </div>
          <div class="flex gap-4">
            @if((post()?.createdAt)) {
            <div>
              {{ post()?.createdAt | timenow : currentDate() }}
            </div>
            } @else {
            <div
              class="text-xs w-24 h-4 animate:pulse rounded bg-slate-400"
            ></div>
            }
          </div>
        </div>
        <div class="flex flex-col pt-2 w-full gap-1 justify-center">
          <div class="flex">
            @if(post()?.title){
            <h2 class="text-3xl">{{ post()?.title }}</h2>
            } @else {
            <div
              class="text-xs w-8/12 h-7 animate:pulse rounded bg-slate-400"
            ></div>
            }
          </div>
          <div class="flex gap-2">
            @if(post()?.tags) { @for(tag of post()?.tags; track tag._id) {
            <sub class="text-xs bg-blue-500 rounded-xl p-1">{{ tag.name }}</sub>
            } } @else { @for (item of [1,2,3]; track $index) {
            <div
              class="text-xs w-16 h-4 animate:pulse rounded bg-slate-400"
            ></div>
            }}
          </div>
          <div class="flex">
            @if(post()?.description) {
            <p>{{post()?.description}}</p>
            } @else {
              <div
              class="text-xs w-full h-28 animate:pulse rounded bg-slate-400"
            ></div>
            }
          </div>
        </div>
      </ng-container>
    </app-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  post = input<Post>();
  currentDate = signal(new Date());
  intervalID: any;

  constructor() {
    this.intervalID = setInterval(() => {
      this.currentDate.set(new Date());
    }, 10000);
  }
}
