import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectError } from 'src/app/state/authentication/authentication.selectors';
import { login } from 'src/app/state/authentication/authentication.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private store = inject(Store);
  isLoading = this.store.selectSignal(selectIsLoading);
  error = this.store.selectSignal(selectError);

  username = '';
  password = '';

  onLogin() {
    if (!this.username || !this.password) {
      return
    }

    this.store.dispatch(
      login({
        credentials: {
          username: this.username,
          password: this.password
        }
      })
    );
  }

}
