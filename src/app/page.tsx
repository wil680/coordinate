import Link from "next/link"
import TextType from "@/components/ui/texttype"

export default function Home() {
  return (
    <main className="min-h-screen grid items-start justify-center p-16 bg-blue-50">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">
          <TextType
            text={["Welcome to Coordinate", "Your Personal Calendar App"]}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={1500}
            loop
            className="inline-block"
            textColors={["text-blue-600", "text-green-600"]}
          />
        </h1>
        <div className="flex gap-4 justify-center">
          <Link className="underline" href="/api/auth/signin?callbackUrl=/dashboard">Sign in</Link>
          <Link className="underline" href="/api/auth/signout">Sign out</Link>
        </div>
      </div>
    </main>
  )
}

