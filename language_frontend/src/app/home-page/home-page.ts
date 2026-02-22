import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { selectIsLogged } from 'src/app/state/authentication/authentication.selectors';
import { selectMyResources } from 'src/app/state/resources/resource.selectors';
import { getMyResources } from '../state/resources/resource.actions';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private store = inject(Store);
  isLogged = this.store.selectSignal(selectIsLogged);
  resources = this.store.selectSignal(selectMyResources)

  ngOnInit(): void {
    if (this.isLogged()) {
      this.store.dispatch(getMyResources());
    }
  }
}
