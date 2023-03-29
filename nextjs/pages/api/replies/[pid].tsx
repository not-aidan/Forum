import { z } from "zod";
import { getReplies } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let { pid } = req.query;
	let postId = z.string().parse(pid);
	res.status(200).json(await getReplies(postId));
}
