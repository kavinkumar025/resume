import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})

export class AboutComponent {
  public experience: string = '';

  constructor() {
    this.calculateExperience();
  }

  public calculateExperience() {
    const startDate = new Date(2022, 8);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    this.experience = `${years}.${months}`;
  }
}
