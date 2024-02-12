import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { Store } from '@ngrx/store';
import CardComponent from '../../../../../../shared/components/card/card.component';
import ImgAvatarComponent from '../../../../../../shared/components/img-avatar/img-avatar.component';
import { userFeature } from '../../../../../../stores/user/user.reducer';
import { NgFor } from '@angular/common';
import { TimenowPipe } from '../../../../../../shared/pipes/timenow/timenow.pipe';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    MarkdownComponent,
    CardComponent,
    ImgAvatarComponent,
    NgFor,
    TimenowPipe,
  ],
  templateUrl: './preview.component.html',
  styles: `
.height {
    height: calc(100dvh - 340px);
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PreviewComponent implements OnDestroy {
  markdown = signal('');
  title = signal('');
  description = signal('');
  tags = signal([]);
  date = signal(new Date());
  currentDate = signal(new Date());
  intervalID: any;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly userDetails = this.store.selectSignal(userFeature.selectDetails);

  // future reference for adding flowcharts and stuff
  //   markdown = signal(`
  //   # Heading level 1

  //   1. First item
  //   .height {
  //   height: calc(100dvh - 200px);
  // }

  //   2. Second item

  //   - First item
  //   - Second item

  //   ---

  //   [Duck Duck Go](https://duckduckgo.com).

  //   ![Pricle Image!](/assets/pricle/pricle-icon.png "Pricle Icon")

  //   | Syntax      | Description |
  // | ----------- | ----------- |
  // | Header      | Title       |
  // | Paragraph   | Text        |

  // - [x] Write the press release
  // - [ ] Update the website
  // - [ ] Contact the media

  // First Term
  // : This is the definition of the first term.

  // Second Term
  // : This is one definition of the second term.
  // : This is another definition of the second term.

  // $\sqrt{3x-1}+(1+x)^2$

  // X$^a$$^a$$^a$$^a$

  // X$_2$$_2$$_2$$_2$$_2$

  // \`\`\`mermaid
  //   graph TD;
  //       A-->B;
  //       A-->C;
  //       C-->B;
  //       B-->D;
  //       C-->D;
  // \`\`\`

  //   Inline \`code\` has \`back-ticks around\` it.

  //   \`\`\`javascript
  //   var s = "JavaScript syntax highlighting";

  //   function alert(s) {
  //     window.alert(s);
  //   }

  //   alert(s);.builder.controls
  //   \`\`\`

  //   \`\`\`Python
  //   s = "Python syntax highlighting"
  //   print s
  //   \`\`\`

  //   \`\`\`
  //   No language indicated, so no syntax highlighting.
  //   But let's throw in a <b>tag</b>.
  //   \`\`\`
  //   `);
  //   markdown2 = signal(`
  //   \`\`\`javascript
  //   var s = "JavaScript syntax highlighting";

  //   function alert(s) {
  //     window.alert(s);
  //   }

  //   alert(s);
  //   \`\`\`
  //   `);

  constructor() {
    let local = localStorage.getItem('postPrevData');
    localStorage.removeItem('postPrevData');
    let data = local ? JSON.parse(local) : undefined;
    if (!data) {
      this.router.navigate(['/']);
      return;
    }
    let content = data['content'].trim();
    let title = data['title'],
      description = data['description'],
      tags = data['tags'] ? JSON.parse(data['tags']) : [];
    if (content) {
      this.markdown.set(atob(content));
    }
    if (title) {
      this.title.set(title);
    }
    if (description) {
      this.description.set(description);
    }
    if (tags && tags.length > 0) {
      this.tags.set(tags);
    }

    this.intervalID = setInterval(() => {
      this.currentDate.set(new Date());
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalID);
  }
}
export default PreviewComponent;
