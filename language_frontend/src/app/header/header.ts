import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/authentication/authentication.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { logout } from 'src/app/state/authentication/authentication.actions';
import { selectLanguage } from 'src/app/state/resources/resource.selectors';
import { LANGUAGES, getLanguageByCode } from 'src/app/entities/languages';
import { changeLanguage } from 'src/app/state/resources/resource.actions';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);
  language = this.store.selectSignal(selectLanguage);
  isSubmenuOpen = signal(false);
  isLanguageSelectorOpen = signal(false);
  currentLanguage = computed(() => getLanguageByCode(this.language()));
  languages = LANGUAGES;

  toggleSubmenu = () => {
    this.isLanguageSelectorOpen.set(false);
    this.isSubmenuOpen.set(!this.isSubmenuOpen());
  };

  toggleLanguageSelector = () => {
    this.isSubmenuOpen.set(false);
    this.isLanguageSelectorOpen.set(!this.isLanguageSelectorOpen());
  };

  selectLanguage = (code: string, event: Event) => {
    event.stopPropagation();
    this.store.dispatch(changeLanguage({ request: { language: code } }));
    this.isLanguageSelectorOpen.set(false);
  };

  logout = () => this.store.dispatch(logout());
}
