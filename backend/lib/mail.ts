import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `<div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px
    ">
        <h2>Hello There!</h2>
        <p>${text}</p>
        <p>😘, Yobra</p>
    </div>`;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the  user a token
  const info = (await transport.sendMail({
    to,
    from: 'thalamine@gmail.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  })) as MailResponse;

  // console.log(info);

  if (process.env.MAIL_USER?.includes('ethereal.email')) {
    console.log(`✉️ Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
