import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})

export class ScrollComponent {

  public showScrollButton = true;
  @HostListener('window:scroll', [])

  public onWindowScroll() {
    this.showScrollButton = window.scrollY > 20;
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
}
