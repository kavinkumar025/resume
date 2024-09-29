import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {
  public contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?\d*$/)]],
      description: ['', Validators.required]
    });
  }

  public submitForm() {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      const dataToStore = {
        name: formValue.name,
        subject: formValue.subject,
        email: formValue.email,
        phone: Number(formValue.phone),
        description: formValue.description,
      };
      this.firestore.collection('contacts').add(dataToStore)
        .then(() => {
          console.log('Data saved successfully!');
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Hi " + formValue.name + " Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.contactForm.reset();
        })
        .catch((error) => {
          console.error('Error saving data: ', error);
        });
    } else {
      console.log('Invalid form');
    }
  }

}
