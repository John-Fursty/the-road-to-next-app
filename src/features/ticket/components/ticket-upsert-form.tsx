"use client"

import { useActionState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { upsertTicket } from "../actions/ticket-upsert"
import { Ticket } from "@/generated/prisma/client"
import { SubmitButton } from "@/components/form/submit-button"
import { FieldError } from "@/components/form/form-error"
import { ActionState, EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { useActioncFeedback } from "@/components/form/hooks/use-action-feedback"

type TicketUpsertFormProps = {
    ticket?: Ticket
}

export const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)

    useActioncFeedback(actionState, {
        onSuccess: ({ actionState }) => {
            console.log(actionState.message)
        },
        onError: ({ actionState }) => {
            console.log(actionState.message)
        }
    })

    return (
        <form action={action} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" defaultValue={ (actionState.payload?.get("title") as string) ?? ticket?.title}/>
            <FieldError actionState={actionState} name="title"/>
            
            <Label htmlFor="content">Content</Label>
            <Textarea name="content" id="content" defaultValue={ (actionState.payload?.get("content") as string) ?? ticket?.content}></Textarea>
            <FieldError actionState={actionState} name="content"/>
          
           <SubmitButton label={ticket ? "Edit" : "Create"}/>

        </form> 
    )
}