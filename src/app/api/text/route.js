import pool from "@/database/db";

export async function GET(request) {
    const urlSearchParams = new URLSearchParams(request.url);
    const link = urlSearchParams.get("link");
    
    const [results, fields] = await pool.execute('SELECT text FROM links WHERE link=?', link);
    const text = results[0].text;
    console.log(text);

	return Response.json({ text: text }, { status: 200 });
}