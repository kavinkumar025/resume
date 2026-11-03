import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements AfterViewInit, OnDestroy {

  @ViewChild('skillsHeader') skillsHeader!: ElementRef;
  @ViewChild('primarySkillsContainer') primarySkillsRef!: ElementRef;
  @ViewChild('skillsBento') skillsBento!: ElementRef;

  primarySkills = [
    { name: 'Angular (13+)', percent: 95, level: 'Expert', icon: 'fa-brands fa-angular', color: 'linear-gradient(90deg, #ef4444, #f97316)' },
    { name: 'TypeScript / JavaScript', percent: 90, level: 'Expert', icon: 'fa-solid fa-code', color: 'linear-gradient(90deg, #8B5CF6, #a78bfa)' },
    { name: 'HTML5 / CSS3 / SCSS', percent: 90, level: 'Expert', icon: 'fa-brands fa-html5', color: 'linear-gradient(90deg, #f97316, #fbbf24)' },
    { name: 'Next.js', percent: 80, level: 'Advanced', icon: '', color: 'linear-gradient(90deg, #22D3EE, #6ee7b7)' },
    { name: 'RESTful APIs', percent: 100, level: 'Expert', icon: 'fa-solid fa-plug', color: 'linear-gradient(90deg, #34d399, #22D3EE)' },
    { name: 'Kendo UI / Telerik', percent: 85, level: 'Advanced', icon: '', color: 'linear-gradient(90deg, #6366f1, #8B5CF6)' },
    { name: 'Unit Testing (Jasmine/Karma)', percent: 80, level: 'Advanced', icon: 'fa-solid fa-vial', color: 'linear-gradient(90deg, #f43f5e, #ec4899)' },
    { name: 'Node.js / Express.js', percent: 70, level: 'Intermediate', icon: 'fa-brands fa-node-js', color: 'linear-gradient(90deg, #22c55e, #16a34a)' },
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Header
    if (this.skillsHeader?.nativeElement) {
      const st = ScrollTrigger.create({
        trigger: this.skillsHeader.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(this.skillsHeader.nativeElement.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    if (prefersReducedMotion) return;

    // Skill bars — animate width
    if (this.primarySkillsRef?.nativeElement) {
      const items = this.primarySkillsRef.nativeElement.querySelectorAll('.skill-bar-item');
      const fills = this.primarySkillsRef.nativeElement.querySelectorAll('.skill-fill');

      // Initially hide fills
      gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' });

      const st = ScrollTrigger.create({
        trigger: this.primarySkillsRef.nativeElement,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(items,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
          );
          gsap.to(fills, {
            scaleX: 1,
            duration: 1.2,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power3.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    // Bento cards
    if (this.skillsBento?.nativeElement) {
      const cards = this.skillsBento.nativeElement.querySelectorAll('.bento-card');
      const st = ScrollTrigger.create({
        trigger: this.skillsBento.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(cards,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.3)' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }
  }

  ngOnDestroy() {
    this.scrollTriggers.forEach(st => st.kill());
  }
}
