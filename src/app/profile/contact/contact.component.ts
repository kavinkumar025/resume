import { Component, inject } from '@angular/core';
// import { Firestore } from'@angular/fire/firestore';
// import { addDoc,collection} from 'firebase/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?\d*$/)]],
      description: ['', Validators.required]
    });
  }

  submitForm() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      console.log('Form data:', this.contactForm.value);
      this.contactForm.reset();
    } else {
     console.log('Invalid')
    }
  }
 
}
