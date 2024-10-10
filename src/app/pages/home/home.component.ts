import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  public menuToggled = false;
  public currentPersonaIndex = 0;
  public displayTitle = '';
  public fadeIn = true;
  private typewriterTimeout: any;
  private personaTimeout: any;
  private fadeTimeout: any; // Timer pour le fade-out et la suppression
  public isHovered = false;
  private remainingTime = 5000;
  private startTime = 0;
  private fadeRemainingTime = 4000; // Temps initial pour le fade-out

  public personaeMessages = [
    {
      title: 'Développeur',
      message:
        'Notre modèle optimisé pour les développeurs offre des solutions IA avancées pour faciliter votre travail quotidien. Personnalisez et déployez vos propres modèles LLM adaptés à vos besoins de développement.',
    },
    {
      title: 'Curieux',
      message:
        "Explorez les capacités de notre modèle IA et découvrez comment il peut transformer votre compréhension de la technologie. Plongez dans l'univers de l'IA et personnalisez vos expériences.",
    },
    {
      title: 'Chef de Projet',
      message:
        'Accélérez la réalisation de vos projets avec notre IA sur mesure. Nos modèles LLM optimisés offrent des solutions efficaces et flexibles pour répondre aux défis de gestion et de développement.',
    },
    {
      title: 'Entrepreneur',
      message:
        "Accélérez l'innovation avec notre IA de pointe, développée pour transformer vos idées en produits. Profitez de modèles flexibles et performants pour répondre aux besoins uniques de votre entreprise.",
    },
    {
      title: 'Data Scientist',
      message:
        'Découvrez un modèle IA puissant et personnalisable, conçu pour vos analyses et vos explorations de données. Optimisez vos flux de travail et créez des solutions LLM sur mesure pour des insights plus précis et plus rapides.',
    },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {}

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

    setTimeout(() => {
      this.showPersona();
    }, 100);

    cards.forEach((card: any) => observer.observe(card));
  }
  ngOnDestroy() {
    clearTimeout(this.personaTimeout);
    clearTimeout(this.typewriterTimeout);
    clearTimeout(this.fadeTimeout); // Nettoyage du timer de fade-out
  }

  private showPersona() {
    const persona = this.personaeMessages[this.currentPersonaIndex];
    this.displayTitle = '';
    this.fadeIn = true;

    let charIndex = 0;
    const typeWriter = () => {
      if (charIndex < persona.title.length) {
        this.displayTitle += persona.title[charIndex++];
        this.typewriterTimeout = setTimeout(typeWriter, 80);
      } else {
        this.startPersonaRotation();
      }
    };
    typeWriter();
  }

  private startPersonaRotation() {
    if (this.isHovered) return;

    this.startTime = Date.now();
    this.personaTimeout = setTimeout(() => {
      this.currentPersonaIndex =
        (this.currentPersonaIndex + 1) % this.personaeMessages.length;
      this.showPersona();
    }, this.remainingTime);

    // Gère le fade-out et la suppression du texte
    this.fadeTimeout = setTimeout(() => {
      this.deleteText();
      this.fadeIn = false;
    }, this.fadeRemainingTime);
  }

  private deleteText() {
    const interval = 50;
    const deleteInterval = setInterval(() => {
      this.displayTitle = this.displayTitle.slice(0, -1);
      if (!this.displayTitle) {
        clearInterval(deleteInterval);
      }
    }, interval);
  }

  public pauseRotation() {
    this.isHovered = true;
    clearTimeout(this.personaTimeout);
    clearTimeout(this.typewriterTimeout);
    clearTimeout(this.fadeTimeout);
    this.remainingTime -= Date.now() - this.startTime;
    this.fadeRemainingTime -= Date.now() - this.startTime;
  }

  public resumeRotation() {
    this.isHovered = false;
    this.startTime = Date.now();

    this.personaTimeout = setTimeout(() => {
      this.currentPersonaIndex =
        (this.currentPersonaIndex + 1) % this.personaeMessages.length;
      this.showPersona();
    }, this.remainingTime);

    this.fadeTimeout = setTimeout(() => {
      this.deleteText();
      this.fadeIn = false;
    }, this.fadeRemainingTime);
  }

  public toggleMenu($event: any) {
    this.menuToggled = $event;
  }
}
