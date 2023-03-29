import { signIn, signOut, useSession } from "next-auth/react"

function LogoutButton() {
	return (<button className="self-center hover:text-red-400" onClick={() => signOut()}>Logout</button>)
}

function LoginButton() {
	return (<button className="self-center hover:text-orange-400" onClick={() => signIn()}>Login</button>)
}

export default function NavBar() {
	const { data: session } = useSession();
	return (
		<div className="w-full gap-4 h-12 grid grid-cols-3 mb-4 text-white bg-slate-700">
			<div className="block flex gap-4 flex-row pl-4">
				<a href="/" className="self-center hover:text-orange-400">Posts</a>
				<a href="/create" className="self-center hover:text-orange-400">Create Post</a>
			</div>
			<div className="block flex">
				<h1 className="self-center text-center grow">Forum</h1>
			</div>
			<div className="block flex flex-row-reverse pr-4">
				{session ? <LogoutButton></LogoutButton> : <LoginButton></LoginButton>}
			</div>
		</div>
	)
}
