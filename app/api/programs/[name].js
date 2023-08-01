import {NextResponse} from 'next/server'
import clientPromise from "../../../lib/mongo";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("openeasm");
        return NextResponse.json({data: request.name, message: "Hello"})
        const posts = await db
            .collection("project")
            .aggregate([
                {$project: {"name": 1, "domains_count": {$size: "$domains"}}},
                {$sort: {"domains_count": -1}}])
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