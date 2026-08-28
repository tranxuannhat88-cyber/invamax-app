import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Gửi dữ liệu tới Google Apps Script Webhook
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.warn("Chưa cấu hình GOOGLE_SCRIPT_URL");
      // Dành cho lúc đang test chưa có URL
      return NextResponse.json({ success: true, message: 'Simulated success' });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to submit' }, { status: 500 });
    }
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
