import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { loginFromToken } from './state/authentication/authentication.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('language_frontend');
  store = inject(Store);
  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(loginFromToken());
    }
  }
}
