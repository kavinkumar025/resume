import { Component, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { SeoService } from '../seo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnDestroy {

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

  private revealObserver?: IntersectionObserver;

  constructor(private router: Router, private seo: SeoService, private element: ElementRef<HTMLElement>) { this.seo.update(); }

  ngAfterViewInit() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    this.revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          this.revealObserver?.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -25px 0px', threshold: 0.05 });
    for (const node of Array.from(this.element.nativeElement.querySelectorAll<HTMLElement>('[data-aos]'))) {
      if (node.getBoundingClientRect().top < window.innerHeight) continue;
      node.classList.add('reveal-pending');
      this.revealObserver.observe(node);
    }
  }

  ngOnDestroy() { this.revealObserver?.disconnect(); }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentSectionId = '';
    for (let section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          currentSectionId = section.id;
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
