import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET(
  _request: Request,
  { params }: { params: { ticketId: string } },
) {
  const resolvedParams = await params;

  const ticket = await getTicket(resolvedParams.ticketId);

  return Response.json(ticket);
}
