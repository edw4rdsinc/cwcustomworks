/**
 * Vercel Serverless Function - Newsletter Signup Handler
 * Sends newsletter signups to colew@cwcustomworks.com
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
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        message: 'Please enter your email address'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please enter a valid email address'
      });
    }

    // Prepare email content
    const emailSubject = 'New Newsletter Signup - CW Custom Works';
    const emailBody = `
New Newsletter Subscriber

Email: ${email}

━━━━━━━━━━━━━━━━━━━━
Subscribed from: www.cwcustomworks.com
Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Boise' })}

Note: Add this email to your mailing list for window care tips and special offers.
    `.trim();

    // Send email using Resend API
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Newsletter service not configured'
      });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CW Custom Works Newsletter <noreply@updates.edw4rds.com>',
        to: ['colew@cwcustomworks.com'],
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
    console.log('Newsletter signup email sent:', result.id);

    return res.status(200).json({
      success: true,
      message: 'Thanks for subscribing! You\'ll receive window care tips and exclusive offers.',
      emailId: result.id
    });

  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    return res.status(500).json({
      error: 'Server error',
      message: 'Sorry, there was an error. Please try again later.'
    });
  }
}
