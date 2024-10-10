import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public links = [
    { label: 'A propos', url: '/accueil' },
    { label: 'Documentation', url: 'https://docs.mistral.ai/' },
    { label: 'Personnalisation', url: 'https://console.mistral.ai/' },
    { label: 'Société', url: 'https://mistral.ai/fr/company/' },
    { label: 'Actualités', url: 'https://mistral.ai/fr/news/' },
  ];

  public isMenuOpen = false;
  @Output() public menuToggled = new EventEmitter<boolean>(false);
  public scrolled = false;

  constructor() {}

  ngOnInit() {
    this.scrollToTop();
  }

  ngOnDestroy() {
    this.scrollToTop();
  }

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }

  public scrollToTop() {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public toggleMenu($event: Event) {
    $event.stopPropagation();
    setTimeout(() => {
      this.isMenuOpen = !this.isMenuOpen;
      this.menuToggled.emit(this.isMenuOpen);
    }, 50);
  }
}
