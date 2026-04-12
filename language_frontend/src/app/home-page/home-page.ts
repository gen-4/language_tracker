import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { selectIsLogged } from 'src/app/state/authentication/authentication.selectors';
import { selectMyResources, selectMyResourcesCount, isLoading, selectError } from 'src/app/state/resources/resource.selectors';
import { getMyResources, createResourcesValidationError, createResource } from 'src/app/state/resources/resource.actions';
import { ResourceRequest } from 'src/app/entities/resource.model';

import { Paginator } from 'src/app/common/paginator/paginator';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, CommonModule, Paginator, ReactiveFormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private store = inject(Store);
  isLogged = this.store.selectSignal(selectIsLogged);
  resources = this.store.selectSignal(selectMyResources)
  count = this.store.selectSignal(selectMyResourcesCount);
  isLoading = this.store.selectSignal(isLoading);
  error = this.store.selectSignal(selectError);
  typeStatus = signal({ text: false, video: false, audio: false })
  title = new FormControl('');
  link = new FormControl('');
  timeHours = new FormControl(0);
  timeMinutes = new FormControl(0);
  pages = new FormControl(0);

  ngOnInit(): void {
    if (this.isLogged()) {
      this.store.dispatch(getMyResources({ page: 1 }));
    }
  }

  changePage(page: number) {
    this.store.dispatch(getMyResources({ page }));
  }

  typeClick(type: string) {
    this.typeStatus.update(current => ({
      ...current,
      [type]: !current[type as keyof typeof current]
    }));
  }

  addResource() {
    if (!this.title.value) {
      this.store.dispatch(createResourcesValidationError({ error: 'Title cannot be empty' }));
      return
    }

    const type = Object.entries(this.typeStatus())
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join('&');

    const time: number = (this.timeHours.value ?? 0) * 60 + (this.timeMinutes.value ?? 0);

    const request: ResourceRequest = {
      title: this.title.value,
      type: type,
      link: this.link.value ? this.link.value : undefined,
      time: time == 0 ? undefined : time,
      pages: this.pages.value ? this.pages.value : undefined
    };

    this.store.dispatch(createResource({ request }))
  }

}


