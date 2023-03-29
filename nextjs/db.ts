import { Db, MongoClient, ObjectId, } from "mongodb"

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const dbClient = new MongoClient(url);

const DB_NAME = 'forum';
let db: undefined | Db = undefined;

export async function database() {
	if (!db) {
		db = (await dbClient.connect()).db(DB_NAME);
	}
	return db;
}
export interface Reply {
	author: string,
	reply: string,
}

export interface PostData {
	_id: string,
	author: string,
	title: string,
	description: string,
}

export async function getReplies(postId: string): Promise<Reply[]> {
	let db = await database();
	// TODO zod this
	return await db.collection('reply' + postId).find({}).toArray() as unknown[] as Reply[];
}

export async function getPost(postId: string): Promise<PostData> {
	let db = await database();
	let id = new ObjectId(postId);
	// TODO zod this
	return await db.collection('post').findOne({ _id: id }) as unknown as PostData;
}
