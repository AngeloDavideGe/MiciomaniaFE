import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notifiche',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="home-navbar-wrapper">
      <button
        class="btn toggle-btn"
        (click)="notificheOpen.set(!notificheOpen())"
        [ngClass]="{
          'btn-primary': notificheOpen(),
          'btn-outline-primary': !notificheOpen(),
        }"
      >
        <i
          class="bi"
          [class.bi-bell]="!notificheOpen()"
          [class.bi-bell-fill]="notificheOpen()"
        ></i>
      </button>
    </div>

    @if (notificheOpen()) {
      <div class="dropdown-panel shadow-sm" style="top: 4rem">
        <ul class="custom-nav">
          <li class="nav-item dropdown"></li>
        </ul>
      </div>
    }
  `,
  styleUrl: '../styles/toggle.styles.scss',
})
export class NotificheComponent {
  public notificheOpen = signal<boolean>(false);
}
