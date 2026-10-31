import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  public title = 'resume';
  public myPhoneNumber = '9092850954';

  public downloadPDF() {
    const pdfFilePath = 'assets/Kavinkumar_AngularDeveloper.pdf';
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Kavinkumar_AngularDeveloper.pdf';
    link.dispatchEvent(new MouseEvent('click'));
    link.remove();
    window.open(pdfFilePath, '_blank');
  }

  public openWhatsApp() {
    window.open(`https://wa.me/${this.myPhoneNumber}`, '_blank');
  }
}
