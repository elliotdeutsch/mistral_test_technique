import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../../ui/header/header.component';
import { CompaniesCarouselComponent } from '../../ui/companies-carousel/companies-carousel.component';
import { FooterComponent } from '../../ui/footer/footer.component';
import { MenuComponent } from '../../ui/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CompaniesCarouselComponent,
    FooterComponent,
    MenuComponent,
  ],
})
export class HomeComponent implements AfterViewInit {
  public menuToggled = false;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.transparent-card');

    if (typeof window === 'undefined') {
      return;
    }
    if (!('IntersectionObserver' in window)) {
      cards.forEach((card: any) => card.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card: any) => observer.observe(card));
  }

  public toggleMenu($event: any) {
    this.menuToggled = $event;
  }
}
