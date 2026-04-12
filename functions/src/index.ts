import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import nodemailer from 'nodemailer';

initializeApp();

const gmailUser = defineSecret('GMAIL_USER');
const gmailAppPassword = defineSecret('GMAIL_APP_PASSWORD');
const contactToEmail = defineSecret('CONTACT_TO_EMAIL');
const contactCcEmail = 'kavinkumarkk026@gmail.com';

type ContactPayload = {
  name?: string;
  subject?: string;
  email?: string;
  phone?: string | null;
  description?: string;
  dateTime?: string;
};

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const sendContactNotification = onDocumentCreated(
  {
    document: 'contacts/{contactId}',
    secrets: [gmailUser, gmailAppPassword, contactToEmail]
  },
  async (event) => {
    const snapshot = event.data;

    if (!snapshot) {
      logger.warn('Contact trigger fired without snapshot data.');
      return;
    }

    const contact = snapshot.data() as ContactPayload;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser.value(),
        pass: gmailAppPassword.value()
      }
    });

    const submittedAt = escapeHtml(contact.dateTime ?? new Date().toISOString());
    const name = escapeHtml(contact.name ?? 'Unknown visitor');
    const subject = escapeHtml(contact.subject ?? 'No subject');
    const email = escapeHtml(contact.email ?? 'No email provided');
    const phone = escapeHtml(contact.phone ?? 'Not provided');
    const description = escapeHtml(contact.description ?? 'No message provided');

    const html = `
      <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="padding: 24px 28px; background: linear-gradient(135deg, #0f172a 0%, #312e81 100%); color: #f8fafc;">
            <p style="margin: 0 0 8px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #c7d2fe;">Resume Contact Form</p>
            <h2 style="margin: 0; font-size: 24px;">New contact submission received</h2>
          </div>
          <div style="padding: 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; width: 140px; font-weight: 700; color: #475569;">Name</td><td style="padding: 10px 0;">${name}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: 700; color: #475569;">Email</td><td style="padding: 10px 0;">${email}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: 700; color: #475569;">Phone</td><td style="padding: 10px 0;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: 700; color: #475569;">Subject</td><td style="padding: 10px 0;">${subject}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: 700; color: #475569; vertical-align: top;">Message</td><td style="padding: 10px 0; line-height: 1.7;">${description.replace(/\n/g, '<br>')}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: 700; color: #475569;">Submitted At</td><td style="padding: 10px 0;">${submittedAt}</td></tr>
            </table>
          </div>
        </div>
      </div>`;

    try {
      await transporter.sendMail({
        from: `"Resume Contact Form" <${gmailUser.value()}>`,
        to: contactToEmail.value(),
        cc: contactCcEmail,
        replyTo: contact.email,
        subject: `New resume contact: ${contact.subject ?? 'No subject'}`,
        text: [
          'New contact submission received.',
          `Name: ${contact.name ?? 'Unknown visitor'}`,
          `Email: ${contact.email ?? 'No email provided'}`,
          `Phone: ${contact.phone ?? 'Not provided'}`,
          `Subject: ${contact.subject ?? 'No subject'}`,
          `Message: ${contact.description ?? 'No message provided'}`,
          `Submitted At: ${contact.dateTime ?? new Date().toISOString()}`
        ].join('\n'),
        html
      });

      await getFirestore().collection('contacts').doc(snapshot.id).update({
        mailStatus: 'sent',
        mailedAt: FieldValue.serverTimestamp()
      });
    } catch (error) {
      logger.error('Unable to send contact email.', error);

      await getFirestore().collection('contacts').doc(snapshot.id).update({
        mailStatus: 'failed',
        mailError: error instanceof Error ? error.message : 'Unknown error',
        mailFailedAt: FieldValue.serverTimestamp()
      });
    }
  }
);