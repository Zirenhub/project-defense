import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent {
  currentOpenModal: 'signup' | 'login' | null = null;

  openModal(modal: 'signup' | 'login') {
    this.currentOpenModal = modal;
  }

  closeModal() {
    this.currentOpenModal = null;
  }
}
