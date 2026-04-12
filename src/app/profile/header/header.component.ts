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
  private readonly mobileBreakpoint = 768;

  sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skill', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;

    if (this.menuOpen && window.innerWidth <= this.mobileBreakpoint) {
      this.closeMenu();
    }

    const scrollPosition = window.pageYOffset + window.innerHeight / 2;

    for (let section of this.sections) {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= scrollPosition) {
        this.activeSection = section.id;
      }
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth > this.mobileBreakpoint && this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu() {
window.scrollTo({ top: 0, behavior: 'smooth' });

  const checkScrollEnd = () => {
    if (window.scrollY === 0) {
      this.menuOpen = !this.menuOpen;
      window.removeEventListener('scroll', checkScrollEnd);
    }
  };

  window.addEventListener('scroll', checkScrollEnd);
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
