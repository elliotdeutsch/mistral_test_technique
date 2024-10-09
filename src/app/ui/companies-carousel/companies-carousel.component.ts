import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies-carousel',
  templateUrl: './companies-carousel.component.html',
  styleUrls: ['./companies-carousel.component.scss'],
  imports: [],
  standalone: true,
})
export class CompaniesCarouselComponent implements OnInit {
  companiesMultiplier = [1, 2];
  constructor() {}

  ngOnInit() {}
}
