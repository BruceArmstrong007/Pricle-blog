import { App } from './../../utils/app.const';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  NgZone,
  signal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientRoutes, RoutesInterface } from '../../utils/client.routes';
import { selectUrl } from '../../router-store/router-selector';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { ModeService } from '../../services/mode/mode.service';
import ButtonComponent from '../button/button.component';
import LoaderComponent from '../loader/loader.component';
import { EarthService } from './services/earth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, NgIf, ButtonComponent, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing-page.component.html',
  styles: `
   loader {
    --loader-font-size: 6rem;
    --loader-line-height: 1;
    }
    `,
})
class LandingPageComponent implements AfterViewInit, OnDestroy {
  private readonly store = inject(Store);
  readonly mode = inject(ModeService);
  readonly earth = inject(EarthService);
  routePath = this.store.selectSignal(selectUrl);
  @ViewChild('cmp') container!: ElementRef<HTMLCanvasElement>;
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  private readonly ngZone = inject(NgZone);
  readonly appName: Signal<string> = signal(App.NAME);
  readonly slogan: Signal<string> = signal(App.SLOGAN);

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.earth.createScene(this.container);
      this.earth.animateFrames();
    });
  }

  ngOnDestroy(): void {
    this.ngZone.runOutsideAngular(() => {
      this.earth.destroyEarth();
    });
  }
}

export default LandingPageComponent;
