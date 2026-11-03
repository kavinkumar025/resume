import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('expHeader') expHeader!: ElementRef;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('timelineProgress') timelineProgress!: ElementRef;
  @ViewChild('proHeader') proHeader!: ElementRef;
  @ViewChild('proGrid') proGrid!: ElementRef;
  @ViewChild('personalHeader') personalHeader!: ElementRef;
  @ViewChild('personalGrid') personalGrid!: ElementRef;

  totalExperience = '';
  currentJobDuration = '';
  private scrollTriggers: ScrollTrigger[] = [];

  ngOnInit(): void {
    this.calculateDurations();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initAnimations(), 100);
  }

  private initAnimations(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Section headers
    [this.expHeader, this.proHeader, this.personalHeader].forEach(ref => {
      if (!ref?.nativeElement) return;
      const st = ScrollTrigger.create({
        trigger: ref.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(ref.nativeElement.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    });

    if (prefersReducedMotion) return;

    // Animated timeline progress line
    if (this.timelineProgress?.nativeElement && this.timeline?.nativeElement) {
      const st = ScrollTrigger.create({
        trigger: this.timeline.nativeElement,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(this.timelineProgress.nativeElement, {
            scaleY: self.progress,
            transformOrigin: 'top center'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    // Timeline items stagger
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(item,
            { opacity: 0, x: -50, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.8, delay: i * 0.05, ease: 'power3.out' }
          );
          // Animate timeline dot
          const node = item.querySelector('.timeline-node');
          if (node) {
            gsap.fromTo(node,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, delay: i * 0.05 + 0.2, ease: 'back.out(2)' }
            );
          }
        }
      });
      this.scrollTriggers.push(st);
    });

    // Pro project cards
    if (this.proGrid?.nativeElement) {
      const cards = this.proGrid.nativeElement.querySelectorAll('.pro-card');
      const st = ScrollTrigger.create({
        trigger: this.proGrid.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // Personal project cards
    if (this.personalGrid?.nativeElement) {
      const cards = this.personalGrid.nativeElement.querySelectorAll('.personal-card');
      const st = ScrollTrigger.create({
        trigger: this.personalGrid.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(cards,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }
  }

  private calculateDurations(): void {
    const now = new Date();
    const totalStart = new Date(2022, 8);
    let ty = now.getFullYear() - totalStart.getFullYear();
    let tm = now.getMonth() - totalStart.getMonth();
    if (tm < 0) { ty--; tm += 12; }
    this.totalExperience = ty > 0
      ? `${ty} yr${ty > 1 ? 's' : ''}${tm > 0 ? ' ' + tm + ' mo' : ''}`
      : `${tm} mo`;

    const curStart = new Date(2025, 0);
    let cy = now.getFullYear() - curStart.getFullYear();
    let cm = now.getMonth() - curStart.getMonth();
    if (cm < 0) { cy--; cm += 12; }
    this.currentJobDuration = cy > 0
      ? `${cy} yr${cy > 1 ? 's' : ''}${cm > 0 ? ' ' + cm + ' mo' : ''}`
      : `${cm} mo`;
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
  }
}
