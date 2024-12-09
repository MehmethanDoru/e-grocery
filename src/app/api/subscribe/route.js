import { transporter } from '@/config/email';
import { welcomeEmail } from '@/api/email/templates/welcome';
import { subscriberService } from '@/api/supabase/services/subscriberService';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add subscriber to database
    const result = await subscriberService.addNewSubscriber(email);

    if (result.error) {
      if (result.status === 409) {
        return new Response(JSON.stringify({ 
          error: 'This email is already subscribed to our newsletter'
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw new Error(result.error);
    }

    // Send welcome email
    try {
      await transporter.sendMail(welcomeEmail(email));
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter'
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Subscribed to newsletter, but welcome email could not be sent'
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    
    return new Response(JSON.stringify({
      error: 'Failed to process subscription'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}