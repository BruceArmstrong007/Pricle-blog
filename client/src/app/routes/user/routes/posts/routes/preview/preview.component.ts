import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { Params } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { selectQueryParams } from '../../../../../../shared/router-store/router-selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './preview.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PreviewComponent {
  markdown = signal('');
  private readonly store = inject(Store);
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
    // router Store selection
    const param: Signal<Params> = this.store.selectSignal(selectQueryParams);
    let content = param()['content'].trim();
    let title = param()['title'],
      description = param()['description'],
      tags = param()['tags'] ? JSON.parse(param()['tags']) : undefined;
    // console.log(content, atob(content), title, description, tags);
    // if (content) {
    //   console.log(atob(content));
    // }
  }
}
export default PreviewComponent;
