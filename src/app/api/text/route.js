import pool from "@/database/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const paste = searchParams.get('paste');

    let [results, fields] = await pool.execute('SELECT paste FROM pastes WHERE paste=?', [paste]);
    if (results.length === 0) {
        return Response.json({ paste: paste }, { status: 404 });
    }

    [results, fields] = await pool.execute('SELECT paste FROM pastes WHERE paste=?', [paste]);
    const text = results[0].text;

	return Response.json({ text: text }, { status: 200 });
}