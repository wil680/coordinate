import Link from "next/link"
import TextType from "@/components/ui/texttype"
import {Info} from "@/components/ui/info"

export default function Home() {
  return (
    <main className="min-h-screen grid items-start justify-center p-16 bg-blue-50">
      
      <div className="text-center space-y-3">
        <div className="relative">
        <h1 className="text-4xl font-bold min-h-[64px]">
          <TextType
            text={["Welcome to Coordinate", "Your Personal Calendar App"]}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={1500}
            loop
            className="inline-block absolute inset-0"
            textColors={["text-blue-600", "text-green-600"]}
          />
        </h1>
        </div>
        <div className="flex gap-4 justify-center mt-10">
          <button className="btn btn-soft btn-lg rounded-xl">
          <Link href="/api/auth/signin?callbackUrl=/dashboard">Try it now</Link>
          </button>
        </div>

      </div>
      <Info />

    </main>
    
  )
}

