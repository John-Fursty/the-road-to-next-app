"use client"

import { useActionState, useRef } from "react"
import { DatePicker, ImperativeHandleFromDatePicker } from "@/components/date-picker"
import { Form } from "@/components/form/form"
import { FieldError } from "@/components/form/form-error"
import { SubmitButton } from "@/components/form/submit-button"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Ticket } from "@/generated/prisma/client"
import { fromCent } from "@/utils/currency"
import { upsertTicket } from "../actions/upsert-ticket"

type TicketUpsertFormProps = {
    ticket?: Ticket
}

export const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => {
    
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)

    const dataPickerImperativeHandleRef = useRef<ImperativeHandleFromDatePicker>(null)

    const handleSuccess = () => {
        dataPickerImperativeHandleRef.current?.reset()
    } 

    return (
        <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" defaultValue={ (actionState.payload?.get("title") as string) ?? ticket?.title}/>
            <FieldError actionState={actionState} name="title"/>
            
            <Label htmlFor="content">Content</Label>
            <Textarea name="content" id="content" defaultValue={ (actionState.payload?.get("content") as string) ?? ticket?.content}></Textarea>
            <FieldError actionState={actionState} name="content"/>

            <div className="flex gap-x-2 mb-1">
                <div className="w-1/2 flex flex-col gap-y-1">
                    <Label htmlFor="deadline">Deadline</Label>
                    <DatePicker /* key={actionState.timestamp} */ id="deadline" defaultValue={ (actionState.payload?.get("deadline") as string) ?? ticket?.deadline} name="deadline" imperativeHandleRef={dataPickerImperativeHandleRef}/> 
                    <FieldError actionState={actionState} name="deadline"/>
                </div>
                
                <div className="w-1/2 flex flex-col gap-y-1">
                    <Label htmlFor="bounty">Bounty ($)</Label> 
                    <Input type="number" name="bounty" id="bounty" min="0"  step=".01" defaultValue={ (actionState.payload?.get("bounty") as string) ?? (ticket?.bounty ? fromCent(ticket?.bounty) : "")}/>
                    <FieldError actionState={actionState} name="bounty"/>
                </div>
            </div>         

           <SubmitButton label={ticket ? "Edit" : "Create"}/>

        </Form> 
    )
}