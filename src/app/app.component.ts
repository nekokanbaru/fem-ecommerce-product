import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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
    trigger('outInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  isMenuOpen: boolean = false;
  isCartOpen: boolean = false;
  numOfItems: number = 0;
  numOfItemsInCart: number = 0;
  numOfItemsChanged: boolean = false;
  currentImageIndex: number = 1;
  carouselID: any = null;

  openMenu(menu: string) {
    if (menu == 'hamburger') {
      this.isMenuOpen = !this.isMenuOpen;
    } else if (menu == 'cart') {
      this.isCartOpen = !this.isCartOpen;
    }
    document.querySelector('body')?.classList.toggle('fixed-position');
  }

  deleteItems() {
    this.numOfItemsInCart = 0;
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
    this.numOfItems = 0;
  }

  imageSlider(direction: string) {
    if (direction == 'next') {
      if (this.currentImageIndex < 4) {
        this.currentImageIndex++;
        this.changeImage(this.currentImageIndex);
      } else {
        this.currentImageIndex = 1;
        this.changeImage(this.currentImageIndex);
      }
    } else {
      if (this.currentImageIndex > 1) {
        this.currentImageIndex--;
        this.changeImage(this.currentImageIndex);
      } else {
        this.currentImageIndex = 3;
        this.changeImage(this.currentImageIndex);
      }
    }
  }

  changeImage(index: number) {
    let image = document.querySelector<HTMLElement>('.image-slider');
    if (image) {
      image.style.backgroundImage =
        "url('../assets/images/image-product-" + index + ".jpg')";
      image.style.transition = '0.5s';
      this.currentImageIndex = index;
      this.carousel('stop');
    }
  }

  ngOnInit(): void {
    this.carousel('start');
  }

  carousel(action: string) {
    if (action == 'start') {
      if (window.innerWidth > 1024) {
        this.carouselID = setInterval(() => {
          if (this.currentImageIndex == 4) {
            this.currentImageIndex = 0;
          }
          this.changeImage(++this.currentImageIndex);
        }, 5000);
      }
    } else {
      //stop carousel if user clicks on an image, then start it again
      if (this.carouselID != null) clearInterval(this.carouselID);
      this.carousel('start');
    }
  }
}
