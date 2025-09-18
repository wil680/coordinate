import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session.user as any).id as string

  const body = await req.json()
  const { title, start, end, allDay = false, description, location, calendarId } = body

  // default to user's first calendar
  let calId = calendarId as string | undefined
  if (!calId) {
    const m = await prisma.membership.findFirst({ where: { userId }, select: { calendarId: true } })
    if (!m) return NextResponse.json({ error: "No calendar" }, { status: 400 })
    calId = m.calendarId
  }

  const event = await prisma.event.create({
    data: {
      calendarId: calId,
      title,
      start: new Date(start),
      end: new Date(end),
      allDay: !!allDay,
      description: description ?? null,
      location: location ?? null,
    },
  })

  return NextResponse.json({ ok: true, event })
}
