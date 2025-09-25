import Link from "next/link"

function Navbar(){
return(
<div className="navbar bg-base-300 ">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Coordinate</a>
  </div>
  <div className="flex-none gap-4">
    <div className="flex gap-4 justify-center p-4">
          <Link className="underline" href="/api/auth/signin?callbackUrl=/dashboard">Sign in</Link>
          <Link className="underline" href="/api/auth/signout">Sign out</Link>
        </div>
  </div>
</div>)
}

export {Navbar}