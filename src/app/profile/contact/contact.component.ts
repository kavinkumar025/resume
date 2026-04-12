import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

const trimmedRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = `${control.value ?? ''}`.trim();
  return value.length > 0 ? null : { required: true };
};

const minTrimmedLength = (minimumLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = `${control.value ?? ''}`.trim();

    if (!value.length) {
      return null;
    }

    return value.length >= minimumLength
      ? null
      : {
          minTrimmedLength: {
            requiredLength: minimumLength,
            actualLength: value.length
          }
        };
  };
};

const tenDigitPhone: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = `${control.value ?? ''}`.trim();

  if (!value.length) {
    return null;
  }

  return /^\d{10}$/.test(value) ? null : { phoneDigits: true };
};

export interface ToastConfig {
  type: 'success' | 'error';
  title: string;
  message: string;
  visible: boolean;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnDestroy {
  public contactForm: FormGroup;
  public toast: ToastConfig = { type: 'success', title: '', message: '', visible: false };
  public isSubmitting = false;
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      name: ['', [trimmedRequired, minTrimmedLength(3)]],
      subject: ['', [trimmedRequired, minTrimmedLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [tenDigitPhone]],
      description: ['', [trimmedRequired, minTrimmedLength(10)]]
    });
  }

  showToast(type: 'success' | 'error', title: string, message: string) {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toast = { type, title, message, visible: true };
    this.toastTimer = setTimeout(() => {
      this.toast.visible = false;
    }, 4000);
  }

  dismissToast() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toast.visible = false;
  }

  ngOnDestroy() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  getControl(controlName: string) {
    return this.contactForm.get(controlName);
  }

  isInvalid(controlName: string) {
    const control = this.getControl(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(controlName: string) {
    const control = this.getControl(controlName);

    if (!control?.errors) {
      return '';
    }

    if (control.errors['required']) {
      switch (controlName) {
        case 'name':
          return 'Full name is required.';
        case 'subject':
          return 'Subject is required.';
        case 'email':
          return 'Email is required.';
        case 'description':
          return 'Message is required.';
        default:
          return 'This field is required.';
      }
    }

    if (control.errors['email']) {
      return 'Enter a valid email address.';
    }

    if (control.errors['phoneDigits']) {
      return 'Phone number must contain exactly 10 digits.';
    }

    if (control.errors['minTrimmedLength']) {
      switch (controlName) {
        case 'name':
          return 'Full name must be at least 3 characters.';
        case 'subject':
          return 'Subject must be at least 3 characters.';
        case 'description':
          return 'Message must be at least 10 characters.';
        default:
          return 'Please enter more details.';
      }
    }

    return 'Invalid value.';
  }

  trimControl(controlName: string) {
    const control = this.getControl(controlName);
    const value = control?.value;

    if (typeof value === 'string') {
      control?.setValue(value.trim(), { emitEvent: false });
      control?.updateValueAndValidity({ emitEvent: false });
    }
  }

  sanitizePhoneInput() {
    const phoneControl = this.getControl('phone');
    const digitsOnly = `${phoneControl?.value ?? ''}`.replace(/\D/g, '').slice(0, 10);

    if (phoneControl && phoneControl.value !== digitsOnly) {
      phoneControl.setValue(digitsOnly, { emitEvent: false });
      phoneControl.updateValueAndValidity({ emitEvent: false });
    }
  }

  public async submitForm() {
    if (this.contactForm.valid) {
      const formValue = {
        name: `${this.contactForm.value.name ?? ''}`.trim(),
        subject: `${this.contactForm.value.subject ?? ''}`.trim(),
        email: `${this.contactForm.value.email ?? ''}`.trim(),
        phone: `${this.contactForm.value.phone ?? ''}`.trim(),
        description: `${this.contactForm.value.description ?? ''}`.trim()
      };

      const currentDate = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      }).format(currentDate);

      const dataToStore = {
        name: formValue.name,
        subject: formValue.subject,
        email: formValue.email,
        phone: formValue.phone || null,
        description: formValue.description,
        dateTime: formattedDate
      };

      try {
        this.isSubmitting = true;
        await firstValueFrom(this.http.post('/api/contact', dataToStore));
        this.showToast('success', 'Message sent', `Thanks ${formValue.name}, your message has been delivered successfully.`);
        this.contactForm.reset();
      } catch (error) {
        console.error('Error sending message: ', error);
        this.showToast('error', 'Unable to send', 'The message could not be sent right now. Please try again shortly.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.contactForm.markAllAsTouched();
      this.showToast('error', 'Please fix the errors', 'Fill in all required fields correctly before submitting.');
    }
  }
}