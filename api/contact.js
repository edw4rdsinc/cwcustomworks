/**
 * Vercel Serverless Function - Contact Form Handler
 * Sends form submissions directly to colew@cwcustomworks.com
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, phone, address, service, timeline, projectDetails, consent } = req.body;

    // Basic validation
    if (!name || !email || !phone || !service) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please fill out all required fields (name, email, phone, service)'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please enter a valid email address'
      });
    }

    // Prepare email content
    const emailSubject = `New Quote Request from ${name} - CW Custom Works`;
    const emailBody = `
New Quote Request Received

Contact Information:
━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Phone: ${phone}
${address ? `Address: ${address}` : ''}

Project Details:
━━━━━━━━━━━━━━━━━━━━
Service Requested: ${service}
${timeline ? `Timeline: ${timeline}` : ''}

${projectDetails ? `Project Description:\n${projectDetails}` : 'No additional details provided'}

━━━━━━━━━━━━━━━━━━━━
Submitted from: www.cwcustomworks.com
Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Boise' })}
    `.trim();

    // Send email using Resend API (you already have this set up!)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Email service not configured. Please contact us directly at (208) 949-7019'
      });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CW Custom Works Website <noreply@updates.edw4rds.com>',
        to: ['colew@cwcustomworks.com'],
        reply_to: email,
        subject: emailSubject,
        text: emailBody
      })
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error('Resend API error:', errorData);
      throw new Error('Failed to send email');
    }

    const result = await resendResponse.json();
    console.log('Email sent successfully:', result.id);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your quote request has been received. Cole will contact you within 24 hours.',
      emailId: result.id
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: 'Server error',
      message: 'Sorry, there was an error submitting your request. Please call us directly at (208) 949-7019'
    });
  }
}
