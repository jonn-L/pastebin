// Import the 'pool' object for database access
import pool from "@/database/db";

export async function GET(request) {
    // Extract the 'paste' parameter from the request URL
    const { searchParams } = new URL(request.url);
    const paste = searchParams.get('paste');

    // Retrieve the 'paste' from the database
    let [results, fields] = await pool.execute('SELECT paste FROM pastes WHERE paste=?', [paste]);

    // If the 'paste' is not found in the database, respond with a 404 status code
    if (results.length === 0) {
        return Response.json({ paste: paste }, { status: 404 });
    }

    // Retrieve the 'text' associated with the found 'paste' from the database
    [results, fields] = await pool.execute('SELECT text FROM pastes WHERE paste=?', [paste]);
    const text = results[0].text;

    return Response.json({ text: text }, { status: 200 });
}
