import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/utils/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactFormSchema.parse(body);

    // TODO: Send email using email service (e.g., Resend, SendGrid)
    // For now, just log the data
    console.log('Contact form submission:', validatedData);

    // Simulate email sending
    // await sendEmail({
    //   to: 'contact@lavarwave.co.kr',
    //   from: validatedData.email,
    //   subject: validatedData.subject,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${validatedData.name}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //     <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
    //     <p><strong>Subject:</strong> ${validatedData.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${validatedData.message}</p>
    //   `,
    // });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
