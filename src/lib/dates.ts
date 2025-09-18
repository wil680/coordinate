import { startOfWeek, endOfWeek, addDays, format, eachHourOfInterval, startOfDay, differenceInCalendarDays } from "date-fns"

export function getWeekRange(date = new Date()) {
  const start = startOfWeek(date, { weekStartsOn: 0 }) // Sunday
  const end = endOfWeek(date, { weekStartsOn: 0 })
  return { start, end }
}


export function getWeekDays(start: Date) {
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export function getHours() {
  return eachHourOfInterval({ start: new Date(0,0,0,0,0), end: new Date(0,0,0,23,0) })
}

export function dayIndexInWeek(date: Date, weekStart: Date){
    return differenceInCalendarDays(startOfDay(date), startOfDay(weekStart))
}

export function minutesFromStartOfDay(date: Date){
    return date.getHours() * 60 + date.getMinutes()
}

export { format }
