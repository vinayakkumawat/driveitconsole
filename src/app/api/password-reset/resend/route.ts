import { fetchApi, getCall2AllToken, sendVerificationCode } from '@/lib/api';
import { generateVerificationCode } from '@/lib/auth';

export async function POST(req: Request) {
    const { verificationId } = await req.json();
    
    try {
        // Decode the verificationId to get user information
        const decodedData = JSON.parse(atob(verificationId));
        const { userId, timestamp } = decodedData;

        // Check if the verification is still valid (within 10 minutes)
        const now = Date.now();
        if (now - timestamp > 10 * 60 * 1000) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Verification code has expired. Please request a new one.' 
            }), { status: 400 });
        }

        // Get user details
        const users = await fetchApi('/users', {
            params: { id: `eq.${userId}` }
        });

        if (!users.length) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'User not found' 
            }), { status: 404 });
        }

        const user = users[0];
        const code = generateVerificationCode();

        // Update verificationId with new code
        const newVerificationId = btoa(JSON.stringify({ 
            userId: user.id, 
            code,
            timestamp: now,
            phone: user.phone // Include phone number for display
        }));

        // Send new OTP via Call2All
        const call2AllToken = await getCall2AllToken('043136703', '0527186026');
        await sendVerificationCode(call2AllToken, user.phone, code);

        return new Response(JSON.stringify({
            success: true,
            verificationId: newVerificationId
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error resending verification code:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Failed to resend verification code' 
        }), { status: 500 });
    }
} 