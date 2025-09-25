import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/db"
import { getWeekRange } from "@/lib/dates"
import WeekView from "@/components/week-view"


import NewEventDialog from "@/components/new-event-dialog"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/api/auth/signin")
  const userId = (session.user as any).id as string

  // ensure user has a calendar (first login safety)
  const member = await prisma.membership.findFirst({ where: { userId }, select: { calendarId: true } })
  let calendarId = member?.calendarId
  if (!calendarId) {
    const cal = await prisma.calendar.create({
      data: { name: "Primary", memberships: { create: { userId, role: "OWNER" } } },
      select: { id: true }
    })
    calendarId = cal.id
  }

  const { start, end } = getWeekRange(new Date())

  const events = await prisma.event.findMany({
    where: {
      calendar: { memberships: { some: { userId } } },
      start: { gte: start },
      end: { lte: end }
    },
    select: { id: true, title: true, start: true, end: true, allDay: true }
  })

  return (
    <main className="p-6 bg-base-200 text-base-content p-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold mb-4">Week</h1>
      <NewEventDialog />
    </div>
    <div data-theme="light" className="rounded-box bg-base-0 shawdow-sm p-4">
      <WeekView events={events} weekStart={start} />
    </div>
    </main>
  )
}
