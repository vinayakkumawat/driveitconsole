import { fetchApi } from '@/lib/api';

export async function POST(req: Request) {
    try {
        const { userId, password } = await req.json();

        // Validate input
        if (!userId || !password) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid payload' }), { status: 400 });
        }

        console.log('Sending PATCH request to update password:', { userId, password });

        // Update the user's password
        await fetchApi(`/users`, {
            params: {
                id: `eq.${userId}`
            },
            method: 'PATCH',
            body: JSON.stringify({ password }),
        });

        // Respond with success
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error updating password:', error);

        // Respond with error
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}
