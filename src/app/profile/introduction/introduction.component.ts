import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent {

  public title = 'resume';
  @ViewChild('textContainer', { static: true })
  public textContainerRef!: ElementRef;
  public roles = ['Front End Web Developer - Angular 13+', 'Data Modeler'];
  public index = 0;
  public roleIndex = 0;
  public isInDeletingState = false;
  public myPhoneNumber = '9092850954';

  ngOnInit() {
    this.typeWriter();
  }

  public downloadPDF() {
    const pdfFilePath = 'assets/Kavinkumar.M_CV.pdf';
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Kavinkuamar_Resume.pdf';
    link.dispatchEvent(new MouseEvent('click'));
    link.remove();
    window.open(pdfFilePath, '_blank');
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
        setTimeout(() => this.typeWriter(), 3000);
      } else {
        setTimeout(() => this.typeWriter(), 100);
      }
    } else {
      this.index--;
      if (this.index === 0) {
        this.isInDeletingState = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
      setTimeout(() => this.typeWriter(), 50);
    }
  }

  public openWhatsApp() {
    const whatsappLink = `https://wa.me/${this.myPhoneNumber}`;
    window.open(whatsappLink, '_blank');
  }

}