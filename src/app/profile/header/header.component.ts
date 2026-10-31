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
  private readonly mobileBreakpoint = 1100;
  isLight = document.documentElement.dataset['theme'] === 'light';

  toggleTheme() {
    this.isLight = !this.isLight;
    const theme = this.isLight ? 'light' : 'dark';
    document.documentElement.dataset['theme'] = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  }

  @HostListener('document:keydown', ['$event'])
  onTab(event: KeyboardEvent) {
    if (!this.menuOpen || event.key !== 'Tab') return;
    const controls = Array.from(document.querySelectorAll<HTMLElement>('.navbar a, .navbar button'))
      .filter(element => element.getBoundingClientRect().width > 0 && !element.classList.contains('nav-backdrop'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.menuOpen) { this.closeMenu(); document.querySelector<HTMLButtonElement>('.nav-toggle')?.focus(); }
  }

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
    this.activeSection = 'introduction';

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
