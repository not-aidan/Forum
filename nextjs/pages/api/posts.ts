import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../db";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	let db = await database();
	res.status(200).json(await db.collection('post').find({}).toArray());
}
