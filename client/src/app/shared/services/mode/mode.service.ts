import {
  Inject,
  Injectable,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  public darkMode: WritableSignal<boolean | null> = signal(null);

  constructor() {
    if (localStorage.getItem('darkMode') == 'true') {
      this.darkMode.set(true);
    } else {
      this.darkMode.set(false);
    }

    effect(() => {
      const darkMode = this.darkMode();
      if (darkMode === true) {
        localStorage.setItem('darkMode', 'true');
      } else {
        localStorage.setItem('darkMode', 'false');
      }
    });
  }

  switchMode() {
    this.darkMode.set(!this.darkMode());
  }
}
