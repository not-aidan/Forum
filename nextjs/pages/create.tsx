import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
	title: string,
	description: string,
}

const TITLE_LENGTH = 10;
const DESCRIPTION_LENGTH = 20;
export default function Create() {
	const { data: session } = useSession();
	const onSubmit: SubmitHandler<FormValues> = (d) => {
		if (d.title.length < TITLE_LENGTH || d.description.length < DESCRIPTION_LENGTH) {
			return;
		}
		const description = (document.getElementById("desc") as HTMLTextAreaElement).value;
		console.log(description)
		fetch("/api/create-post", { body: JSON.stringify({ title: d.title, description: description, auth: session }), method: "POST" });
	};
	const { register, handleSubmit } = useForm();
	if (session && session.user) {
		return (<form id="post-form" onSubmit={handleSubmit(onSubmit)}>
			<label>Title
			</label>
			<br />
			<textarea form="post-form" minLength={TITLE_LENGTH}
				className="resize-y h-8 w-full rounded border-2 border-black mb-1" {...register("title")} />
			<br />
			<label>Description
			</label>
			<br />
			<textarea id="desc" form="post-form" minLength={DESCRIPTION_LENGTH}
				className="resize-y h-24 w-full rounded border-2 border-black mb-1" {...register("description")} />
			<br />
			<input className="cursor-pointer p-2 rounded bg-orange-400 text-white" type="submit" value="Post" />
		</form>);
	}
	if (session && typeof window !== "undefined") {
		window.location.href = "/login";
	}
	return (<div></div>);
}
