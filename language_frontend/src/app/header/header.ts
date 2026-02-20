import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/authentication/authentication.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);
}
