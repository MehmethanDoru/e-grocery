import nodemailer from 'nodemailer';

const config = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true // Enable logging
};

console.log('Email configuration:', {
  ...config,
  auth: {
    user: config.auth.user,
    pass: '****' // Hide password in logs
  }
});

export const transporter = nodemailer.createTransport(config);

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});