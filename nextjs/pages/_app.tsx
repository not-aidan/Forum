import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import Head from 'next/head';
import NavBar from "../components/navbar";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Forum</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<NavBar ></NavBar>
				<div className="max-w-3xl mx-auto">
					<Component {...pageProps} />
				</div>
			</main>
		</SessionProvider>
	)
}
