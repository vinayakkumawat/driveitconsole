export async function POST(req: Request) {
    const { verificationId, code } = await req.json();
    
    try {
        const decodedData = JSON.parse(atob(verificationId));
        if (decodedData.code === code) {
            return new Response(JSON.stringify({ success: true }));
        }
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}