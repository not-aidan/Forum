import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions)
	if (session) {
		let data = JSON.parse(req.body);
		let description = z.string().parse(data.description);
		let title = z.string().parse(data.title);
		let db = await database();

		let content = { title: title, description: description, author: session.user.name };
		res.status(200).json((await db.collection("post").insertOne(content)).insertedId !== null);
	} else {
		console.log("Not Auth");
		console.log(req.headers);
		res.send({ error: "You're not authenticated" });
	}
}
