import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var AOS: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {

  public currentYear = new Date().getFullYear();

  public sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'about', title: 'About Me' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'skill', title: 'Skills' },
    { id: 'education', title: 'Education' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'achievements', title: 'Achievements' },
    { id: 'contact', title: 'Contact' }
  ];

  constructor(private router: Router, private titleService: Title) { }

  ngAfterViewInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ once: true, duration: 800, offset: 100 });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentSectionId = '';
    for (let section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          currentSectionId = section.id;
          this.titleService.setTitle(section.title);
          this.router.navigate([], { fragment: currentSectionId });
          break;
        }
      }
    }
  }

  public onRightClick(event: MouseEvent): void {
    event.preventDefault();
    console.log('Right-click is Disabled !');
  }

}
