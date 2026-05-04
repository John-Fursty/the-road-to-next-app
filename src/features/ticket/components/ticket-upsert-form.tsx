"use client"

import { startTransition, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { upsertTicket } from "../actions/ticket-upsert"
import { Ticket } from "@/generated/prisma/client"
import { LucideLoaderCircle } from "lucide-react"

type TicketUpsertFormProps = {
    ticket?: Ticket
}

export const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => {
    const [isPending, startTransition] = useTransition();

    const upsertTicketAction = (formData: FormData) => {
        startTransition(async () => {
            await upsertTicket.bind(null, ticket?.id)(formData)
        })
    }

    return (
        <form action={upsertTicketAction} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" defaultValue={ticket?.title}/>

            <Label htmlFor="content">Content</Label>
            <Textarea name="content" id="content" defaultValue={ticket?.content}></Textarea>

            <Button disabled={isPending} type="submit" 
            >{isPending && (<LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin"/>)}{ticket ? "Edit" : "Create"}</Button>
        </form> 
    )
}