import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  activeSection: string = 'introduction'; // Default section

  sections = [
    { id: 'about', offset: 0 },
    { id: 'experience', offset: 0 },
    { id: 'skill', offset: 0 },
    { id: 'education', offset: 0 },
    { id: 'contact', offset: 0 }
  ];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        section.offset = element.offsetTop;
      }
    });

    const scrollPosition = window.pageYOffset + window.innerHeight / 2;

    for (let section of this.sections) {
      if (scrollPosition >= section.offset) {
        this.activeSection = section.id;
      }
    }
  }
}
