import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ width: '0%', opacity: 0 }),
        animate('0.5s ease-out', style({ width: '60%', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ width: '60%', opacity: 1 }),
        animate('0.5s ease-in', style({ width: '0%', opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  isMenuOpen: boolean = false;
  numOfItems: number = 0;
  numOfItemsInCart: number = 0;
  numOfItemsChanged: boolean = false;

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.querySelector('body')?.classList.toggle('fixed-position');
  }

  changeNumber(sign: string) {
    this.numOfItemsChanged = true;
    sign == 'plus'
      ? this.numOfItems++
      : this.numOfItems > 0
      ? this.numOfItems--
      : (this.numOfItems = this.numOfItems);
  }

  addItemsToCart() {
    if (this.numOfItems > 0) {
      this.numOfItemsInCart += this.numOfItems;
    }
  }
}
