import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions)
	if (session) {
		let data = JSON.parse(req.body);
		let reply = z.string().parse(data.reply);
		let postId = z.string().parse(data.postId);
		let db = await database();

		// TODO, this doesn't check if the posts exists
		let content = { reply: reply, author: session.user.name };
		res.status(200).json((await db.collection("reply" + postId).insertOne(content)).insertedId !== null);
	} else {
		console.log("Not Auth");
		console.log(req.headers);
		res.send({ error: "You're not authenticated" });
	}
}
