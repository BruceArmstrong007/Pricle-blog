import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
  WritableSignal,
  forwardRef,
  inject,
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
  @Input() customErrorMessages!: Record<string, string>;
  @Input() label!: string;
  @Input() inputID!: string;
  @Input() placeHolder: string = '';
  @Input() options: Record<string, string>[] = [];
  @Input({ required: true }) labelValue!: labelValue;
  @Output() searchEvent: EventEmitter<SearchEvent> = new EventEmitter();
  @ViewChild('sourceElt', { static: true })
  sourceElt: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('targetElt', { static: true }) targetElt:
    | ElementRef<HTMLDivElement>
    | undefined;
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
    if (
      prevValue.find(
        (elt) => elt[this.labelValue.value] === item[this.labelValue.value]
      )
    )
      return;
    this.control.patchValue([...prevValue, item]);
  }

  removeItem(value: string) {
    let prevValue: any[] = this.control.value;
    const index = prevValue.findIndex(
      (elt) => elt[this.labelValue.value] === value
    );
    if (index === -1) return;
    prevValue.splice(index, 1);
    this.control.patchValue([...prevValue]);
  }

  searchValues(event: any) {
    if (!event.target.value) {
      this.isOpen.set(false);
      return;
    }
    if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
      this.searchEvent.emit({ value: event?.target?.value, type: 'enter' });
      event.target.value = '';
    } else if (
      event.keyCode === 27 ||
      event.which === 27 ||
      event.key === 'Escape' ||
      event.key === 'Esc'
    ) {
      this.isOpen.set(false);
    } else {
      this.searchEvent.emit({ value: event?.target?.value, type: 'typing' });
    }
  }
}
