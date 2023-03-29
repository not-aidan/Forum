import { NextPageContext } from 'next';
import { PostData, Reply, getPost } from '../../db';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Post } from '../../components/posts';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { SubmitHandler, useForm } from 'react-hook-form';

export async function getServerSideProps(context: NextPageContext) {
	const { pid } = context.query;
	const id = z.string().parse(pid);
	let post = await getPost(id);
	console.log("Getting", id, post);
	return {
		props: {
			post: post ? { author: post.author, title: post.title, description: post.description } : null,
			id: pid,
		},
	}
}

function Reply(reply: Reply) {
	return (<div className="mr-1 whitespace-pre-wrap cursor-pointer bg-gradient-to-b from-indigo-400 to-violet-500 text-white rounded-lg mb-5 p-2">{reply.author}<br />{reply.reply}</div>);
}

interface FormValues {
	reply: string,
}

interface PostReplyProps {
	postId: string,
	session: Session,
}

function PostReply({ postId, session }: PostReplyProps) {
	const onSubmit: SubmitHandler<FormValues> = (d) => {
		if (d.reply.length < 20) {
			return;
		}
		fetch("/api/reply", { body: JSON.stringify({ ...d, auth: session, postId: postId }), method: "POST" });
	};
	const { register, handleSubmit } = useForm();
	return (<form id="reply-form" onSubmit={handleSubmit(onSubmit)}>
		<textarea form="reply-form" minLength={20}
			className="resize-none h-24 w-full rounded border-2 border-black mb-1" {...register("reply")} />
		<br />
		<input className="cursor-pointer bg-amber-500 rounded-lg p-1 mb-1 text-white" type="submit" value="Reply" />
	</form>);
}

interface PostProps {
	post: PostData | null,
	id: string
}
export default function PostPage({ post, id }: PostProps) {
	const [replies, setReplies] = useState<undefined | Reply[]>(undefined);
	const { data: session } = useSession();
	useEffect(() => {
		if (post) {
			fetch("/api/replies/" + id)
				.then((resp) => {
					resp.json().then((data) => {
						setReplies(data as Reply[]);
					})
				})
		}
	}, []);

	let postReply = session ? <PostReply postId={id} session={session}></PostReply> : <p>Login to reply</p>;

	if (post) {
		return (<div><Post post={post}></Post>{replies ? replies.map((reply, i) => <Reply key={i} {...reply}></Reply>) : <p>Waiting</p>}{postReply}</div>);
	} else {
		return (<div>Error: Invalid post ID</div>)

	}
}
