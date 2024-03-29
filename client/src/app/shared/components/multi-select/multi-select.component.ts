import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
  WritableSignal,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor/control-value-accessor.directive';
import ValidationErrorsComponent from '../validation-errors/validation-errors.component';
import PopupMenuComponent from '../popup-menu/popup-menu.component';
import ButtonComponent from '../button/button.component';

interface labelValue {
  label: string;
  value: string;
}

export interface SearchEvent {
  type: options;
  value: string;
}

export type options = 'typing' | 'enter';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    ValidationErrorsComponent,
    PopupMenuComponent,
    ButtonComponent,
    TitleCasePipe,
  ],
  templateUrl: './multi-select.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultiSelectComponent),
    },
  ],
})
export class MultiSelectComponent<T> extends ControlValueAccessorDirective<T> {
  private readonly renderer = inject(Renderer2);
  customErrorMessages = input<Record<string, string>>();
  label = input<string>();
  inputID = input<string>();
  placeHolder = input<string>('');
  options = input<Record<string, string>[]>([]);
  labelValue = input.required<labelValue>();
  @Output() searchEvent: EventEmitter<SearchEvent> = new EventEmitter();
  @ViewChild('sourceElt', { static: true })
  sourceElt: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('targetElt', { static: true }) targetElt:
    | ElementRef<HTMLDivElement>
    | undefined;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  isOpen: WritableSignal<boolean> = signal(false);

  ngAfterViewInit() {
    const observer = new ResizeObserver((entries) => {
      this.updateDynamicWidth(entries[0].contentRect.width);
    });
    if (this.sourceElt?.nativeElement)
      observer.observe(this.sourceElt?.nativeElement);
  }

  private updateDynamicWidth(width: number) {
    const sourceWidth = width;
    this.renderer.setStyle(
      this.targetElt?.nativeElement,
      'width',
      `${(sourceWidth ? sourceWidth : 0) - 16}px`
    );
  }

  selectItem(item: Record<string, string>) {
    let prevValue: any[] = this.control.value;
    if (!prevValue) return;
    if (
      prevValue.find(
        (elt) => elt[this.labelValue().value] === item[this.labelValue().value]
      )
    )
      return;
    this.control.patchValue([...prevValue, item]);
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.focus();

  }

  removeItem(value: string) {
    let prevValue: any[] = this.control.value;
    const index = prevValue.findIndex(
      (elt) => elt[this.labelValue().value] === value
    );
    if (index === -1) return;
    prevValue.splice(index, 1);
    this.control.patchValue([...prevValue]);
  }

  outOfFocus() {
    setTimeout(() => {
      this.isOpen.set(false);
    }, 300);
  }

  searchValues(event: any) {
    if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
      this.searchEvent.emit({ value: event?.target?.value, type: 'enter' });
      this.searchInput.nativeElement.value = '';
    } else if (
      event.keyCode === 27 ||
      event.which === 27 ||
      event.key === 'Escape' ||
      event.key === 'Esc'
    ) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(true);
      this.searchEvent.emit({ value: event?.target?.value, type: 'typing' });
    }
  }
}
