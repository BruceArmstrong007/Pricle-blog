import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

type formatOptions =
  | 'Bold'
  | 'Italic'
  | 'Link'
  | 'Image'
  | 'Code'
  | 'Strikethrough'
  | 'Emoji'
  | 'Superscript'
  | 'Subscript';

@Component({
  selector: 'app-input-format-options',
  standalone: true,
  imports: [],
  templateUrl: './input-format-options.component.html',
  styles: `
  .tooltip:hover::before {
      content: attr(data-tooltip);
      position: absolute;
      z-index: 10;
      top: -100%;
      background-color: #333;
      font-size: small;
      padding: 5px;
      color: white;
      border-radius: 5px;
      white-space: nowrap;
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormatOptionsComponent {
  @Input() control: FormControl<any> | undefined;
  @Input() inputElt:
    | ElementRef<HTMLTextAreaElement | HTMLInputElement>
    | undefined;

  formatOptions(options: formatOptions) {
    if (!this.inputElt || !this.control) return;
    let selectionStart = this.inputElt.nativeElement.selectionStart,
      selectionEnd = this.inputElt.nativeElement.selectionEnd;
    if (selectionStart && selectionEnd && selectionStart !== selectionEnd) {
      switch (options) {
        case 'Bold':
            this.setOptions(this.control.value,selectionStart,selectionEnd, '**', '**');
          break;
        case 'Italic':
          this.setOptions(this.control.value,selectionStart,selectionEnd, '*', '*');
          break;
        case 'Link':
          this.setOptions(this.control.value,selectionStart,selectionEnd, '[Your Link Name](', ')');
          break;
        case 'Image':
          this.setOptions(this.control.value,selectionStart,selectionEnd, '![Alternative Text][', ']');
          break;
        case 'Code':
          this.setOptions(this.control.value,selectionStart,selectionEnd, '`', '`');
          break;
        case 'Strikethrough':
          this.setOptions(this.control.value,selectionStart,selectionEnd, '~~', '~~');
          break;
        case 'Emoji':
          this.setOptions(this.control.value,selectionStart,selectionEnd, ':', ':');
          break;
        case 'Superscript':
          this.control.patchValue(this.insertAtIndex(this.control.value, '^', selectionEnd));
          this.inputElt.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
          break;
        case 'Subscript':
          this.control.patchValue(this.insertAtIndex(this.control.value, '_', selectionEnd));
          this.inputElt.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
          break;
        default:
          return;
      }
    } else {
      switch (options) {
        case 'Bold':
          this.control.patchValue(this.control.value + ' **Your Bold Text** ');
          this.focusAndSelectInput(17, 3);
          break;
        case 'Italic':
          this.control.patchValue(this.control.value + ' *Your Italic Text* ');
          this.focusAndSelectInput(18, 2);
          break;
        case 'Link':
          this.control.patchValue(
            this.control.value + ' [Your Link Name](Your Link URL) '
          );
          this.focusAndSelectInput(15, 2);
          break;
        case 'Image':
          this.control.patchValue(
            this.control.value + ' ![Alternative Text][Your Image Link] '
          );
          this.focusAndSelectInput(17, 2);
          break;
        case 'Code':
          this.control.patchValue(this.control.value + ' `Your Code` ');
          this.focusAndSelectInput(11, 2);
          break;
        case 'Strikethrough':
          this.control.patchValue(
            this.control.value + ' ~~Your Strikethrough Text~~ '
          );
          this.focusAndSelectInput(26, 3);
          break;
        case 'Emoji':
          this.control.patchValue(this.control.value + ' :Your Emoji Text: ');
          this.focusAndSelectInput(17, 2);
          break;
        case 'Superscript':
          this.control.patchValue(this.control.value + ' Your String^Your Superscript ');
          this.focusAndSelectInput(17, 1);
          break;
        case 'Subscript':
          this.control.patchValue(this.control.value + ' Your String_Your Superscript ');
          this.focusAndSelectInput(17, 1);
          break;
        default:
          return;
      }
    }
  }

  setOptions(val: string, selectionStart: number, selectionEnd: number, attachStart: string, attachEnd: string) {
    if (!this.inputElt || !this.control) return;
          val = this.insertAtIndex(val, attachStart, selectionStart);
          val = this.insertAtIndex(val, attachEnd, selectionEnd + attachStart.length);
          this.control.patchValue(val);
          this.inputElt.nativeElement.focus();
          this.inputElt.nativeElement.setSelectionRange(
            selectionStart + attachStart.length,
            selectionEnd + attachEnd.length
          );
  }

  focusAndSelectInput(start: number, end: number) {
    if (!this.inputElt || !this.control) return;
    let length = this.control.value.length;
    this.inputElt.nativeElement.focus();
    this.inputElt.nativeElement.setSelectionRange(length - start, length - end);
  }

  insertAtIndex(str: string, substring: string, index: number) {
    const arr = str.split('');

    arr.splice(index, 0, substring);

    return arr.join('');
  }
}
