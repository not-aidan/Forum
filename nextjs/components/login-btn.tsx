import { signIn } from "next-auth/react"

export default function LoginButton() {
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn(undefined, { callbackUrl: "/" })}>Sign in</button>
		</>
	)
}
