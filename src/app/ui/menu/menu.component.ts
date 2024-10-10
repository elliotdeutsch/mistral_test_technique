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
    { label: 'Documentation', url: '/accueil' },
    { label: 'Personnalisation', url: '/accueil' },
    { label: 'Société', url: '/accueil' },
    { label: 'Actualités', url: '/accueil' },
    { label: 'Nous contacter', url: '/accueil' },
  ];

  constructor() {}

  ngOnInit() {}
}
