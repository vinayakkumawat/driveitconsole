import { fetchApi, getCall2AllToken, sendVerificationCode } from '@/lib/api';
import { generateVerificationCode } from '@/lib/auth';

export async function POST(req: Request) {
    const { email } = await req.json();

    console.log('Initiating password reset for email:', email);
    
    try {
        // Get user by email
        const users = await fetchApi('/users', {
            params: { email: `eq.${email}` }
        });

        // console.log('Found users:', users);
        
        if (!users.length) {
            return new Response(JSON.stringify({ 
                success: false,
                message: 'No account found with this email address'
            }), { status: 404 });
        }
        
        const user = users[0];
        const code = generateVerificationCode();
        const verificationId = btoa(JSON.stringify({ 
            userId: user.id, 
            code,
            timestamp: Date.now(),
            phone: user.phone // Include phone number for display
        }));
        
        // Send OTP via Call2All
        const call2AllToken = await getCall2AllToken('043136703', '0527186026');
        await sendVerificationCode(call2AllToken, user.phone, code);
        
        return new Response(JSON.stringify({
            success: true,
            userId: user.id,
            verificationId,
            phone: user.phone // Include phone number in response
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ 
            success: false,
            message: 'Failed to initiate password reset'
        }), { status: 500 });
    }
}