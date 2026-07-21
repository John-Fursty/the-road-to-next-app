import type { Comment, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type createCommentArgs = {
  userId: string;
  ticketId: string;
  content: string;
  //   include: Prisma.Subset<T, Prisma.CommentInclude>;
};

export async function createComment({
  userId,
  ticketId,
  content,
  options,
}: createCommentArgs & {
  options?: {
    includeUser?: false;
    includeTicket?: false;
  };
}): Promise<Comment>;

export async function createComment({
  userId,
  ticketId,
  content,
  options,
}: createCommentArgs & {
  options?: {
    includeUser?: false;
    includeTicket?: true;
  };
}): Promise<
  Prisma.CommentGetPayload<{
    include: {
      ticket: true;
    };
  }>
>;

export async function createComment({
  userId,
  ticketId,
  content,
  options,
}: createCommentArgs & {
  options?: {
    includeUser?: true;
    includeTicket?: false;
  };
}): Promise<
  Prisma.CommentGetPayload<{
    include: {
      user: {
        select: { username: true };
      };
    };
  }>
>;

export async function createComment({
  userId,
  ticketId,
  content,
  options,
}: createCommentArgs & {
  options?: {
    includeUser?: true;
    includeTicket?: true;
  };
}): Promise<
  Prisma.CommentGetPayload<{
    include: {
      user: {
        select: { username: true };
      };
      ticket: true;
    };
  }>
>;

export async function createComment({
  userId,
  ticketId,
  content,
  options,
}: createCommentArgs & {
  options?: {
    includeUser?: boolean;
    includeTicket?: boolean;
  };
}) {
  const includeUser = options?.includeUser && {
    user: {
      select: {
        username: true,
      },
    },
  };

  const includeTicket = options?.includeTicket && {
    ticket: true,
  };

  return await prisma.comment.create({
    data: {
      userId: userId,
      ticketId,
      content,
    },
    include: {
      ...includeTicket,
      ...includeUser,
    },
  });
}
