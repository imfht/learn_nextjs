import {NextResponse} from 'next/server'
import clientPromise from "../../../lib/mongo";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("posts");

        const posts = await db
            .collection("posts")
            .find({})
            .limit(20)
            .toArray();
        return NextResponse.json({data: posts})
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}

export async function POST(request) {
    return NextResponse.json({revalidated: true})
}