import { google } from 'googleapis';

interface FormData {
  name?: string;
  email?: string;
  product?: string;
  rating?: number;
  message?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const formData: FormData = await request.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();
    const values = [[
      timestamp,
      formData.name || '',
      formData.email || '',
      formData.product || '',
      formData.rating || '',
      formData.message || '',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: env.SPREADSHEET_ID,
      range: 'A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
