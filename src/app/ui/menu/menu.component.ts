import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [],
})
export class MenuComponent implements OnInit {
  public links = [
    { label: 'A propos', url: '/accueil' },
    { label: 'Documentation', url: 'https://docs.mistral.ai/' },
    { label: 'Personnalisation', url: 'https://console.mistral.ai/' },
    { label: 'Société', url: 'https://mistral.ai/fr/company/' },
    { label: 'Actualités', url: 'https://mistral.ai/fr/news/' },
    { label: 'Nous contacter', url: 'https://mistral.ai/fr/contact/' },
  ];

  constructor() {}

  ngOnInit() {}
}
