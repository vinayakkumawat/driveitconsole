import { fetchApi } from '@/lib/api';

export async function POST(req: Request) {
    const { userId, password } = await req.json();
    
    try {
        await fetchApi(`/users?id=eq.${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({ password })
        });
        
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}