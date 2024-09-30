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
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const istFormattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
      const dataToStore = {
        name: formValue.name,
        subject: formValue.subject,
        email: formValue.email,
        phone: Number(formValue.phone),
        description: formValue.description,
        dateTime: istFormattedDate
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
    }
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid form",
        showConfirmButton: true
      });
      console.log('Invalid form');
    }
  }
}