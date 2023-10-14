// Import the 'pool' object for database access
import pool from '@/database/db';

// Function to generate a random paste of a specified length
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
	const language = body.language;

	let paste = await generatePaste(10);

	// console.log(paste);

	// Infinite loop to generate a unique 'paste' value
	while (1) {
		// Check if the generated 'paste' already exists in the database
		const [results, fields] = await pool.execute('SELECT * FROM pastes WHERE paste=?', [paste]);

		// If the 'paste' is not found in the database, insert it and break the loop
		if (results.length === 0) {
			const [results, fields] = await pool.execute('INSERT INTO pastes (paste, text, language) VALUES (?, ?, ?)', [paste, text, language]);
			break;
		}
		
		// If the 'paste' already exists, generate a new one and continue the loop
		paste = await generatePaste(10);
	}

	return Response.json({ paste: paste }, { status: 200 });
}
