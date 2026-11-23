import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

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
  private readonly mobileBreakpoint = 1260;
  @ViewChild('menuToggle') menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuDrawer') menuDrawer?: ElementRef<HTMLElement>;

  sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'npm-package', label: 'Open Source' },
    { id: 'skill', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certificates' },
    { id: 'achievements', label: 'Highlights' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollY = window.pageYOffset;
    this.isScrolled = scrollY > 60;

    // Scroll progress
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

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
    if (this.menuOpen) this.closeMenu();
    else {
      this.menuOpen = true;
      this.syncBodyScrollLock();
      requestAnimationFrame(() => this.menuDrawer?.nativeElement.querySelector<HTMLButtonElement>('.drawer-close')?.focus());
    }
  }

  closeMenu(restoreFocus = false) {
    const wasOpen = this.menuOpen;
    this.menuOpen = false;
    this.syncBodyScrollLock();
    if (restoreFocus && wasOpen) requestAnimationFrame(() => this.menuToggle?.nativeElement.focus());
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.menuOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu(true);
    } else if (event.key === 'Tab') {
      const focusable = Array.from(this.menuDrawer?.nativeElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }

  scrollTo(id: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - headerHeight,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
      history.replaceState(null, '', `#${id}`);
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
