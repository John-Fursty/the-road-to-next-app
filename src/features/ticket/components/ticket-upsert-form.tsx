"use client"

import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { upsertTicket } from "../actions/upsert-ticket"
import { Ticket } from "@/generated/prisma/client"
import { SubmitButton } from "@/components/form/submit-button"
import { FieldError } from "@/components/form/form-error"
import { ActionState, EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { useActioncFeedback } from "@/components/form/hooks/use-action-feedback"
import { Form } from "@/components/form/form"
import { ActionDidNotRevalidate } from "next/dist/shared/lib/action-revalidation-kind"

type TicketUpsertFormProps = {
    ticket?: Ticket
}

export const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)

    return (
        <Form action={action} actionState={actionState}>
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" defaultValue={ (actionState.payload?.get("title") as string) ?? ticket?.title}/>
            <FieldError actionState={actionState} name="title"/>
            
            <Label htmlFor="content">Content</Label>
            <Textarea name="content" id="content" defaultValue={ (actionState.payload?.get("content") as string) ?? ticket?.content}></Textarea>
            <FieldError actionState={actionState} name="content"/>
          
           <SubmitButton label={ticket ? "Edit" : "Create"}/>

        </Form> 
    )
}