import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy {
  activeSection: string = 'introduction';
  isScrolled: boolean = false;
  menuOpen: boolean = false;
  scrollProgress: number = 0;
  private readonly mobileBreakpoint = 768;

  sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skill', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollY = window.pageYOffset;
    this.isScrolled = scrollY > 60;

    // Scroll progress
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    if (this.menuOpen && window.innerWidth <= this.mobileBreakpoint) {
      this.closeMenu();
    }

    const scrollPosition = scrollY + window.innerHeight / 3;
    let found = false;
    const sectionsCopy = [...this.sections].reverse();
    for (let section of sectionsCopy) {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= scrollPosition) {
        this.activeSection = section.id;
        found = true;
        break;
      }
    }
    if (!found) this.activeSection = 'introduction';
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth > this.mobileBreakpoint && this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.syncBodyScrollLock();
  }

  closeMenu() {
    this.menuOpen = false;
    this.syncBodyScrollLock();
  }

  scrollTo(id: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - headerHeight,
        behavior: 'smooth'
      });
    }
    this.closeMenu();
  }

  ngOnDestroy() {
    document.body.classList.remove('mobile-nav-open');
  }

  private syncBodyScrollLock() {
    document.body.classList.toggle('mobile-nav-open', this.menuOpen && window.innerWidth <= this.mobileBreakpoint);
  }
}
