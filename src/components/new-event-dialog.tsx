"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const Schema = z.object({
  title: z.string().min(1, "Title required"),
  start: z.string(), // ISO datetime-local
  end: z.string(),
}).refine((v) => new Date(v.end) > new Date(v.start), {
    message: "End must be after start", 
    path: ["end"]
})

type FormValues = z.infer<typeof Schema>

export default function NewEventDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: "",
      start: new Date().toISOString().slice(0,16),
      end: new Date(Date.now() + 60*60*1000).toISOString().slice(0,16),
    },
  })

  async function onSubmit(values: FormValues) {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        start: values.start,
        end: values.end,
      }),
    })
    if (res.ok) {
      setOpen(false)
      router.refresh() // re-fetch server data for dashboard
    } else {
      console.error(await res.text())
      alert("Failed to create event")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New event</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Create event</DialogTitle></DialogHeader>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm">Title</label>
            <Input {...form.register("title")} placeholder="Dance Practice" />
          </div>
          <div>
            <label className="text-sm">Start</label>
            <Input type="datetime-local" {...form.register("start")} />
          </div>
          <div>
            <label className="text-sm">End</label>
            <Input type="datetime-local" {...form.register("end")} />
          </div>
          <div className="pt-2">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
