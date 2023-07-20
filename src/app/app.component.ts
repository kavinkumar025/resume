import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resume';
  @ViewChild('textContainer', { static: true })
  textContainerRef!: ElementRef;
  roles = ['Angular Developer', 'Front-end web Developer', 'Data Modeler'];
  index = 0;
  roleIndex = 0;
  isInDeletingState = false;

  ngOnInit() {
    this.typeWriter();
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
        setTimeout(() => this.typeWriter(), 2000); // Pause before deleting
      } else {
        setTimeout(() => this.typeWriter(), 100); // Typing speed
      }
    } else {
      this.index--;
      if (this.index === 0) {
        this.isInDeletingState = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
      setTimeout(() => this.typeWriter(), 50); // Deleting speed
    }
  }
}
