import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/state/authentication/authentication.selectors';
import { signup } from 'src/app/state/authentication/authentication.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {
  private store = inject(Store);
  isLoading = this.store.selectSignal(selectIsLoading);

  username = '';
  password = '';

  onSignup() {
    if (!this.username || !this.password) {
      return
    }

    this.store.dispatch(
      signup({
        credentials: {
          username: this.username,
          password: this.password
        }
      })
    );
  }

}
