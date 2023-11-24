import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  NgZone,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientRoutes, RoutesInterface } from '../../utils/client.routes';
import { selectUrl } from '../../router-store/router-selector';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { ModeService } from '../../services/mode/mode.service';
import { ButtonComponent } from '../button/button.component';
import { LoaderComponent } from '../loader/loader.component';
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
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  private readonly store = inject(Store);
  readonly mode = inject(ModeService);
  readonly earth = inject(EarthService);
  routePath = this.store.selectSignal(selectUrl);
  @ViewChild('cmp') container!: ElementRef<HTMLCanvasElement>;
  Routes: RoutesInterface = ClientRoutes;
  private readonly ngZone = inject(NgZone);

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
