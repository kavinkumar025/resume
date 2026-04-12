const nodemailer = require('nodemailer');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

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
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin'])
      .setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods'])
      .setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers'])
      .end();
  }

  res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
  res.setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
  res.setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, description, dateTime } = req.body || {};

  if (!name || !email || !subject || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const html = buildEmailTemplate({ name, email, phone, subject, description, dateTime });
  const ccAddress = process.env.CONTACT_CC_EMAIL || 'kavinkumarkk026@gmail.com';
  const toAddress = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: toAddress,
      cc: ccAddress,
      replyTo: email,
      subject: `New portfolio enquiry: ${subject}`,
      text: [
        'A new portfolio message has been submitted.',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Subject: ${subject}`,
        `Date: ${dateTime}`,
        '',
        description
      ].join('\n'),
      html
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Unable to send portfolio email', error);
    return res.status(500).json({ error: 'Unable to send message' });
  }
};