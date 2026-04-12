const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const encryptedFirebaseConfig = {
  apiKey: 'U2FsdGVkX19sZDlwVg+VxbD5ubgGxmlYdBQnA701qtsmWJ9XRHYJeVGAE8z4QW+ghdl0jP3hkvTMnQbzyJvfmQ==',
  projectId: 'U2FsdGVkX1/Ds+KVsIX57AItE2aon9GVavct3WgUfkyHQeAnj3ujT7PaifctOHpM'
};

const firebaseConfigKey = process.env.FIREBASE_CONFIG_KEY || 'KavinKumar';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function readEnv(name) {
  const value = process.env[name];

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
  res.setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
  res.setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
}

function decryptFirebaseValue(value) {
  return CryptoJS.AES.decrypt(value, firebaseConfigKey).toString(CryptoJS.enc.Utf8);
}

function getFirebasePublicConfig() {
  return {
    apiKey: readEnv('FIREBASE_WEB_API_KEY') || decryptFirebaseValue(encryptedFirebaseConfig.apiKey),
    projectId: readEnv('FIREBASE_PROJECT_ID') || decryptFirebaseValue(encryptedFirebaseConfig.projectId)
  };
}

function normalizeBody(body) {
  if (!body) {
    return {};
  }

  if (Buffer.isBuffer(body)) {
    return normalizeBody(body.toString('utf8'));
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (error) {
      throw createHttpError(400, 'Invalid JSON payload');
    }
  }

  if (typeof body === 'object') {
    return body;
  }

  throw createHttpError(400, 'Unsupported request body');
}

function normalizeContactPayload(body) {
  const name = `${body.name ?? ''}`.trim();
  const email = `${body.email ?? ''}`.trim();
  const phone = `${body.phone ?? ''}`.trim();
  const subject = `${body.subject ?? ''}`.trim();
  const description = `${body.description ?? ''}`.trim();
  const dateTime = `${body.dateTime ?? ''}`.trim() || new Date().toISOString();

  if (!name || !email || !subject || !description) {
    throw createHttpError(400, 'Missing required fields');
  }

  if (!emailPattern.test(email)) {
    throw createHttpError(400, 'A valid email address is required');
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    throw createHttpError(400, 'Phone number must contain exactly 10 digits');
  }

  return {
    name,
    email,
    phone: phone || null,
    subject,
    description,
    dateTime
  };
}

function getTransportOptions() {
  const smtpHost = readEnv('SMTP_HOST');
  const smtpPort = Number(readEnv('SMTP_PORT') || 0);
  const smtpUser = readEnv('SMTP_USER');
  const smtpPass = readEnv('SMTP_PASS');
  const gmailUser = readEnv('GMAIL_USER');
  const gmailPassword = readEnv('GMAIL_APP_PASSWORD');

  if (gmailUser && gmailPassword) {
    return {
      transport: {
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPassword
        }
      },
      fromAddress: readEnv('CONTACT_FROM_EMAIL') || gmailUser
    };
  }

  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    return {
      transport: {
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      },
      fromAddress: readEnv('CONTACT_FROM_EMAIL') || smtpUser
    };
  }

  return null;
}

async function sendContactEmail(payload) {
  const transportOptions = getTransportOptions();

  if (!transportOptions) {
    throw new Error('SMTP transport is not configured');
  }

  const toAddress = payload.email;
  const ccAddress = 'kavinkumarkk026@gmail.com';

  if (!transportOptions.fromAddress || !toAddress) {
    throw new Error('Email recipients are not configured');
  }

  const transporter = nodemailer.createTransport(transportOptions.transport);
  const html = buildEmailTemplate(payload);

  await transporter.sendMail({
    from: `"Portfolio Contact" <${transportOptions.fromAddress}>`,
    to: toAddress,
    cc: ccAddress,
    replyTo: ccAddress,
    subject: `New portfolio enquiry: ${payload.subject}`,
    text: [
      'A new portfolio message has been submitted.',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || 'Not provided'}`,
      `Subject: ${payload.subject}`,
      `Date: ${payload.dateTime}`,
      '',
      payload.description
    ].join('\n'),
    html
  });
}

function buildFirestoreFields(payload, fallbackReason) {
  const fields = {
    name: { stringValue: payload.name },
    email: { stringValue: payload.email },
    subject: { stringValue: payload.subject },
    description: { stringValue: payload.description },
    dateTime: { stringValue: payload.dateTime },
    mailStatus: { stringValue: 'queued' },
    source: { stringValue: 'vercel-api' },
    queuedAt: { timestampValue: new Date().toISOString() }
  };

  if (payload.phone) {
    fields.phone = { stringValue: payload.phone };
  } else {
    fields.phone = { nullValue: null };
  }

  if (fallbackReason) {
    fields.fallbackReason = { stringValue: fallbackReason.slice(0, 500) };
  }

  return fields;
}

async function queueContactInFirestore(payload, fallbackReason) {
  const firebaseConfig = getFirebasePublicConfig();

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Firebase fallback is not configured');
  }

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(firebaseConfig.projectId)}/databases/(default)/documents/contacts?key=${encodeURIComponent(firebaseConfig.apiKey)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: buildFirestoreFields(payload, fallbackReason)
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Firestore fallback failed with status ${response.status}`);
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailTemplate({ name, email, phone, subject, description, dateTime }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || 'Not provided');
  const safeSubject = escapeHtml(subject);
  const safeDescription = escapeHtml(description).replace(/\n/g, '<br>');
  const safeDateTime = escapeHtml(dateTime);

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Contact Submission</title>
    </head>
    <body style="margin:0;padding:0;background:#eef2ff;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:radial-gradient(circle at top left,#c4b5fd 0%,#eef2ff 38%,#f8fafc 100%);padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 20px 70px rgba(79,70,229,0.16);">
              <tr>
                <td style="padding:0;background:linear-gradient(135deg,#0f172a 0%,#312e81 52%,#7c3aed 100%);">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:32px 32px 24px;">
                        <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.12);color:#c4b5fd;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Portfolio Contact Alert</div>
                        <h1 style="margin:20px 0 10px;color:#ffffff;font-size:32px;line-height:1.15;">A new message just landed</h1>
                        <p style="margin:0;color:rgba(255,255,255,0.78);font-size:15px;line-height:1.7;max-width:520px;">Someone reached out through your resume website. Their message summary is below, ready for follow-up.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 32px 32px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:22px;overflow:hidden;">
                          <tr>
                            <td style="padding:18px 20px;color:#e2e8f0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Submitted</td>
                            <td style="padding:18px 20px;color:#ffffff;font-size:15px;font-weight:600;text-align:right;">${safeDateTime}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 14px;">
                    <tr>
                      <td width="50%" style="vertical-align:top;padding-right:8px;">
                        <div style="padding:18px 20px;border:1px solid #e2e8f0;border-radius:20px;background:#f8fafc;height:100%;">
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6366f1;margin-bottom:8px;">Full Name</div>
                          <div style="font-size:19px;font-weight:700;color:#0f172a;line-height:1.4;">${safeName}</div>
                        </div>
                      </td>
                      <td width="50%" style="vertical-align:top;padding-left:8px;">
                        <div style="padding:18px 20px;border:1px solid #e2e8f0;border-radius:20px;background:#f8fafc;height:100%;">
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6366f1;margin-bottom:8px;">Email Address</div>
                          <div style="font-size:17px;font-weight:600;color:#0f172a;line-height:1.5;word-break:break-word;">${safeEmail}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" style="vertical-align:top;padding-right:8px;">
                        <div style="padding:18px 20px;border:1px solid #e2e8f0;border-radius:20px;background:#f8fafc;height:100%;">
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6366f1;margin-bottom:8px;">Phone Number</div>
                          <div style="font-size:17px;font-weight:600;color:#0f172a;line-height:1.5;">${safePhone}</div>
                        </div>
                      </td>
                      <td width="50%" style="vertical-align:top;padding-left:8px;">
                        <div style="padding:18px 20px;border:1px solid #e2e8f0;border-radius:20px;background:#f8fafc;height:100%;">
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6366f1;margin-bottom:8px;">Subject</div>
                          <div style="font-size:17px;font-weight:600;color:#0f172a;line-height:1.5;">${safeSubject}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding-top:6px;">
                        <div style="padding:22px 22px 24px;border-radius:24px;background:linear-gradient(180deg,#f8fafc 0%,#eef2ff 100%);border:1px solid #dbeafe;">
                          <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7c3aed;margin-bottom:12px;">Message</div>
                          <div style="font-size:16px;line-height:1.8;color:#1e293b;">${safeDescription}</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 32px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:22px;overflow:hidden;">
                    <tr>
                      <td style="padding:18px 22px;color:#94a3b8;font-size:13px;line-height:1.7;">
                        Reply directly to this email to respond to <span style="color:#ffffff;font-weight:700;">${safeName}</span>.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = normalizeContactPayload(normalizeBody(req.body));

    try {
      await sendContactEmail(payload);
      return res.status(200).json({ ok: true, delivery: 'smtp' });
    } catch (mailError) {
      const fallbackReason = mailError instanceof Error ? mailError.message : 'SMTP delivery failed';

      if (fallbackReason === 'SMTP transport is not configured' || fallbackReason === 'Email recipients are not configured') {
        console.warn('Direct email delivery is unavailable, queueing contact in Firestore instead.');
      } else {
        console.error('Unable to send portfolio email directly, falling back to Firestore queue.', mailError);
      }

      await queueContactInFirestore(
        payload,
        fallbackReason
      );

      return res.status(202).json({ ok: true, delivery: 'queued' });
    }
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    const errorMessage = statusCode >= 500 ? 'Unable to send message' : error.message;

    console.error('Unable to handle portfolio contact request', error);
    return res.status(statusCode).json({ error: errorMessage });
  }
};