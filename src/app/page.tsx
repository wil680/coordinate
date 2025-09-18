import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-16">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Schedule Your Meetings</h1>
        <div className="flex gap-4 justify-center">
          <Link className="underline" href="/api/auth/signin?callbackUrl=/dashboard">Sign in</Link>
          <Link className="underline" href="/api/auth/signout">Sign out</Link>
        </div>
      </div>
    </main>
  )
}
