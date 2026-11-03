import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('aboutHeader') aboutHeader!: ElementRef;
  @ViewChild('aboutLeft') aboutLeft!: ElementRef;
  @ViewChild('aboutRight') aboutRight!: ElementRef;
  @ViewChild('rolesSection') rolesSection!: ElementRef;

  public experience: string = '';

  public roles = [
    { icon: 'fa-solid fa-bug-slash', label: 'Developing bug-free applications' },
    { icon: 'fa-solid fa-comments', label: 'Participating in backlog grooming & requirement analysis' },
    { icon: 'fa-solid fa-magnifying-glass-chart', label: 'Conducting code reviews for junior developers' },
    { icon: 'fa-solid fa-vial', label: 'Writing unit tests for specific user stories' },
    { icon: 'fa-solid fa-people-group', label: 'Collaborating with the architecture team' },
    { icon: 'fa-solid fa-clock', label: 'Delivering applications within set deadlines' },
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  ngOnInit() {
    this.calculateExperience();
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Header reveal
    if (this.aboutHeader?.nativeElement) {
      const st = ScrollTrigger.create({
        trigger: this.aboutHeader.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(this.aboutHeader.nativeElement.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // Left card
    if (this.aboutLeft?.nativeElement) {
      const st = ScrollTrigger.create({
        trigger: this.aboutLeft.nativeElement,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(this.aboutLeft.nativeElement,
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // Right cards stagger
    if (this.aboutRight?.nativeElement) {
      const st = ScrollTrigger.create({
        trigger: this.aboutRight.nativeElement,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(this.aboutRight.nativeElement.children,
            { opacity: 0, x: 60, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // Roles grid
    if (this.rolesSection?.nativeElement) {
      const st = ScrollTrigger.create({
        trigger: this.rolesSection.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          const items = this.rolesSection.nativeElement.querySelectorAll('.role-item');
          gsap.fromTo(items,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }
  }

  private calculateExperience() {
    const startDate = new Date(2022, 8);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    if (months < 0) { years--; months += 12; }
    this.experience = `${years}.${months}`;
  }

  ngOnDestroy() {
    this.scrollTriggers.forEach(st => st.kill());
  }
}
