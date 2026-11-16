import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('textContainer', { static: true }) public textContainerRef!: ElementRef;
  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('heroVisual') heroVisual!: ElementRef;
  @ViewChild('heroBadge') heroBadge!: ElementRef;
  @ViewChild('heroName') heroName!: ElementRef;
  @ViewChild('heroRole') heroRole!: ElementRef;
  @ViewChild('heroDesc') heroDesc!: ElementRef;
  @ViewChild('heroCtas') heroCtas!: ElementRef;
  @ViewChild('heroSocials') heroSocials!: ElementRef;
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('reelSection') reelSection!: ElementRef<HTMLElement>;
  @ViewChild('reelTrack') reelTrack!: ElementRef<HTMLElement>;

  public roles = ['Angular Developer', 'Next.js Developer', 'Frontend Developer'];
  public index = 0;
  public roleIndex = 0;
  public isInDeletingState = false;
  public myPhoneNumber = '919092850954';
  public experience: string = '';

  private typewriterTimeout: any;
  private scrollTriggers: ScrollTrigger[] = [];
  private pointerFrame = 0;
  private pointerX = 0;
  private pointerY = 0;

  constructor() {
    this.calculateExperience();
  }

  ngOnInit() {
    // Keep the role visible and complete as soon as the page loads.
  }

  ngAfterViewInit() {
    this.initParallax();
    this.initReelMotion();
  }

  private initReelMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 769) return;
    const section = this.reelSection?.nativeElement;
    const track = this.reelTrack?.nativeElement;
    if (!section || !track) return;
    this.scrollTriggers.push(ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: self => gsap.set(track, { x: (0.5 - self.progress) * 80 })
    }));
  }

  private initHeroAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Badge
    tl.fromTo(this.heroBadge?.nativeElement, {
      opacity: 0, y: -20, scale: 0.9
    }, {
      opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)'
    });

    // Name lines stagger
    const nameLines = this.heroName?.nativeElement?.querySelectorAll('.name-line');
    if (nameLines?.length) {
      tl.fromTo(nameLines, {
        opacity: 0, y: 60, skewX: -2
      }, {
        opacity: 1, y: 0, skewX: 0,
        duration: 0.9, stagger: 0.15, ease: 'power4.out'
      }, '-=0.2');
    }

    // Role
    tl.fromTo(this.heroRole?.nativeElement, {
      opacity: 0, x: -30
    }, {
      opacity: 1, x: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.3');

    // Description
    tl.fromTo(this.heroDesc?.nativeElement, {
      opacity: 0, y: 30
    }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    }, '-=0.2');

    // CTAs
    tl.fromTo(this.heroCtas?.nativeElement, {
      opacity: 0, y: 20
    }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
    }, '-=0.3');

    // Socials
    tl.fromTo(this.heroSocials?.nativeElement, {
      opacity: 0, y: 20
    }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out'
    }, '-=0.2');

    // Visual
    tl.fromTo(this.heroVisual?.nativeElement, {
      opacity: 0, scale: 0.88, x: 40
    }, {
      opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power4.out'
    }, 0.4);
  }

  private initParallax() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero text parallax on scroll
    const st1 = ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (this.heroText?.nativeElement) {
          gsap.set(this.heroText.nativeElement, {
            y: self.progress * 32
          });
        }
        if (this.heroVisual?.nativeElement) {
          gsap.set(this.heroVisual.nativeElement, {
            y: self.progress * 40,
            scale: 1 - self.progress * 0.05
          });
        }
      }
    });
    this.scrollTriggers.push(st1);
  }

  public onHeroPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = this.heroSection?.nativeElement;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    this.pointerX = (event.clientX - rect.left) / rect.width;
    this.pointerY = (event.clientY - rect.top) / rect.height;
    if (this.pointerFrame) return;
    this.pointerFrame = requestAnimationFrame(() => {
      hero.style.setProperty('--pointer-x', `${this.pointerX * 100}%`);
      hero.style.setProperty('--pointer-y', `${this.pointerY * 100}%`);
      hero.style.setProperty('--tilt-x', `${(0.5 - this.pointerY) * 8}deg`);
      hero.style.setProperty('--tilt-y', `${(this.pointerX - 0.5) * 8}deg`);
      this.pointerFrame = 0;
    });
  }

  public resetHeroPointer() {
    const hero = this.heroSection?.nativeElement;
    if (!hero) return;
    if (this.pointerFrame) cancelAnimationFrame(this.pointerFrame);
    this.pointerFrame = 0;
    hero.style.setProperty('--tilt-x', '0deg');
    hero.style.setProperty('--tilt-y', '0deg');
    hero.style.setProperty('--pointer-x', '50%');
    hero.style.setProperty('--pointer-y', '45%');
  }

  public downloadPDF() {
    const pdfFilePath = 'assets/Kavinkumar_AngularDeveloper.pdf';
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Kavinkumar_AngularDeveloper.pdf';
    link.dispatchEvent(new MouseEvent('click'));
    link.remove();
  }

  public typeWriter() {
    const textContainer: HTMLElement = this.textContainerRef.nativeElement;
    const currentRole = this.roles[this.roleIndex];
    const currentText = currentRole.slice(0, this.index);
    textContainer.textContent = currentText;

    if (!this.isInDeletingState) {
      this.index++;
      if (this.index > currentRole.length) {
        this.isInDeletingState = true;
        this.typewriterTimeout = setTimeout(() => this.typeWriter(), 2800);
      } else {
        this.typewriterTimeout = setTimeout(() => this.typeWriter(), 90);
      }
    } else {
      this.index--;
      if (this.index === 0) {
        this.isInDeletingState = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
      this.typewriterTimeout = setTimeout(() => this.typeWriter(), 45);
    }
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

  ngOnDestroy() {
    clearTimeout(this.typewriterTimeout);
    if (this.pointerFrame) cancelAnimationFrame(this.pointerFrame);
    this.scrollTriggers.forEach(st => st.kill());
  }
}
