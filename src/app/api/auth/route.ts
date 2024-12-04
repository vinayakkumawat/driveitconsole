import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;

        // Set the authentication cookie
        (await
            // Set the authentication cookie
            cookies()).set('auth-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400, // 24 hours
                path: '/',
            });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Authentication failed: ' + error },
            { status: 401 },
        );
    }
}

export async function DELETE() {
    // Clear the authentication cookie
    (await
        // Clear the authentication cookie
        cookies()).delete('auth-token');
    return NextResponse.json({ success: true });
}