"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import {
  ActionState,
  fromErrorToAction,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { Prisma } from "@/generated/prisma/client";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";
import { sendEmailVerification } from "../emails/send-email-verification";
import { inngest } from "@/lib/inngest";
import { generateRandomToken } from "@/utils/crypto";

const signUpScheme = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces",
      ),
    email: z.email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    }),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionate: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpScheme.parse(
      Object.fromEntries(formData),
    );

    // console.log(username, email, password);

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      email,
    );

    await inngest.send({
      name: "app/auth.sign-up",
      data: { userId: user.id },
    });

    // const sessionToken = generateRandomToken();
    // const session = await lucia.createSession(sessionToken, user.id);
    // const sessionCookie = lucia.createSessionCookie(session.id);

    // const cookieStore = await cookies();

    // cookieStore.set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes,
    // );

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code == "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }

    return fromErrorToAction(error, formData);
  }

  redirect(ticketsPath());
};
