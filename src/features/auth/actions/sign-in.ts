"use server"

import { ActionState, fromErrorToAction, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import z, { email } from "zod";
import { verify } from "@node-rs/argon2"
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";

const signInScheme = z.object({
    email: z.email(),
    password: z.string().min(6).max(191),
    })

export const signIn = async (_actionate: ActionState, formData: FormData) => {
    try {
        const { email, password } = signInScheme.parse(
            Object.fromEntries(formData)
        )

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return toActionState('ERROR', "Incorrect email or password", formData);
        }

        const validPassword = await verify(user.passwordHash, password)

        if (!validPassword) {
            return toActionState("ERROR", "Incorrect email or password", formData)
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        const cookieStore = await cookies()

        cookieStore.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

    } catch (error) {
        return fromErrorToAction(error, formData);
    }

    redirect(ticketsPath())
}