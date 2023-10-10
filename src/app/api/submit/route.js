import pool from '@/database/db';

async function generatePaste(length) {
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
	let paste = await generatePaste(10);

	while (1) {
		const [results, fields] = await pool.execute('SELECT * FROM pastes WHERE paste=?', [paste]);
		if (results.length === 0) {
			const [results, fields] = await pool.execute('INSERT INTO pastes (paste, text) VALUES (?, ?)', [paste, text]);
			break;
		}
		paste = await generatePaste(10);
	}


	return Response.json({ paste: paste }, { status: 200 });
}