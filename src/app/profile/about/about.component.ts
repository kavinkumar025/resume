import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('colorChangeAnimation', [
      state('blue', style({ backgroundColor: '#3b5998' })),
      state('green', style({ backgroundColor: '#28a745' })),
      transition('blue => green, green => blue', [animate('1s ease-out')]),
    ]),
    trigger('textColorChange', [
      state('blue', style({ color: '#3b5998' })),
      state('green', style({ color: '#28a745' })),
      transition('blue => green, green => blue', [animate('1s ease-out')]),
    ]),
  ],
})

export class AboutComponent {
  public currentColor: string = 'blue';
  public experience: string = '';

  constructor() {
    this.calculateExperience();
  }

  ngOnInit() {
    setInterval(() => { this.toggleColor(); }, 5000);
  }

  public toggleColor() {
    this.currentColor = this.currentColor === 'blue' ? 'green' : 'blue';
  }

  public calculateExperience() {
    const startDate = new Date(2022, 8); // September 2021
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
