import { useEffect, useState } from 'react'
import { PostData } from '../db';

export function Post({ post, truncate }: { post: PostData, truncate?: boolean }) {
	let description = post.description;
	if (truncate && description.length > 100) {
		description = description.slice(0, 100) + "...";
	}
	return (<div onClick={() => window.location.href = "post/" + post._id} className="cursor-pointer bg-gradient-to-b from-orange-400 to-amber-500 text-white rounded-lg mb-5 p-2">
		<p>{post.title}</p>
		<p><i>{post.author}</i></p>
		<p className="whitespace-pre-wrap text-black">{description}</p>
	</div >)
}

export default function Posts({ }) {
	const [posts, setPosts] = useState<null | PostData[]>(null);
	useEffect(() => {
		fetch("api/posts").then((response) => response.json()).then((posts) => { console.log(posts); setPosts(posts); });
	}, []);

	return (<div>
		{
			posts ? posts.map((post, i) => (<Post key={i} post={post} truncate={true}></Post>)) : <></>
		}
	</div>
	);
}
