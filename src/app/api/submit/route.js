import pool from '@/database/db';

async function generateLink(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

export async function POST(request) {
	const body = await request.json();
	
	const text = body.text;
	const link = await generateLink(6);

	const [results, fields] = await pool.execute('INSERT INTO links (link, text) VALUES (?, ?)', [link, text]);

	return Response.json({ link: link }, { status: 200 });
}