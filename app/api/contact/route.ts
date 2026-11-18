import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Anti-Spam Honeypot Verification
    // If the hidden honeypot field is filled by a bot, quietly return success without executing delivery
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: 'Message acknowledged.' },
        { status: 200 }
      );
    }

    // 2. Server-side Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid name (at least 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please enter a message with at least 10 characters.' },
        { status: 400 }
      );
    }

    // 3. Email Provider Dispatch Stub
    // =========================================================================
    // [TODO: Insert your email provider API key here - e.g. RESEND_API_KEY / POSTMARK_API_KEY / SENDGRID_API_KEY]
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio Contact <contact@chinmoyk.ie>',
    //   to: 'chinmoykk3@gmail.com',
    //   replyTo: email,
    //   subject: `[Portfolio Inquiry] ${subject || 'New Contact Request'} from ${name}`,
    //   text: `From: ${name} (${email})\nSubject: ${subject || 'None'}\n\n${message}`,
    // });
    // =========================================================================

    // Simulated log for development environment
    console.log('[Contact Route] Verified submission received:', {
      name,
      email,
      subject: subject || 'General Inquiry',
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! Your message was received successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Route Error]:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please try again or use direct mailto.' },
      { status: 500 }
    );
  }
}
