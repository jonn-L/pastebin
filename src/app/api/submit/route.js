import pool from '../../database/db'

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

async function addLink(text) {

	try {
		let link = await generateLink(6);
		while (true) {
			const [rows, fields] = await pool.execute('SELECT * FROM links WHERE links = ?', [link]);

			if (rows.length == 0) {
				break;
			}
			link = generateLink(6);
		}

		const [rows, fields] = await pool.execute('INSERT INTO links (link, text) VALUES (?, ?)', [link, text]);
	} catch (err) {
		console.error(err);
	}

	return link;
}

export async function POST(request) {
	const body = await request.json();
	
	const text = body.text;
	const link = await addLink(text);

	console.log(link);

	return Response.json({ link: link }, { status: 200 });
}