import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent implements OnInit {

  public title = 'resume';
  @ViewChild('textContainer', { static: true })
  public textContainerRef!: ElementRef;
  public roles = ['Front End Web Developer - Angular 13+', 'Data Modeler'];
  public index = 0;
  public roleIndex = 0;
  public isInDeletingState = false;
  public myPhoneNumber = '9092850954';
  public experience: string = '';

  constructor(){
    this.calculateExperience();
  }

  ngOnInit() {
    this.typeWriter();
  }

  public downloadPDF() {
    const pdfFilePath = 'assets/Kavinkumar_AngularDeveloper.pdf';
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Kavinkumar_AngularDeveloper.pdf';
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

  public calculateExperience() {
    const startDate = new Date(2022, 8); // September 2021
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    this.experience = `${years}.${months}`;
  }

}