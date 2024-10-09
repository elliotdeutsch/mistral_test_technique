import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public links = [
    { label: 'Documentation', url: '/accueil' },
    { label: 'Technologie', url: '/accueil' },
    { label: 'A propos', url: '/accueil' },
    { label: 'Société', url: '/accueil' },
    { label: 'Actualités', url: '/accueil' },
  ];

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
}
