/**
 * This is the data that is created when a user composes a reply to a ticket.
 *
 * @param fromAddress The email address of the user who is sending the reply.
 * @param toAddress The email address of the user who is receiving the reply.
 * @param ccAddress The email address of the user who is receiving the reply as a CC.
 * @param ticketId The ID of the ticket that is being replied to.
 * @param ticketSubject The subject of the ticket that is being replied to.
 * @param threadId The ID of the thread that is being replied to.
 * @param content The content of the reply. Usually HTML encoded.
 */
export type TicketReplyData = {
  fromAddress: string;
  toAddress: string;
  ccAddress: string;
  ticketId: string;
  //Todo: Check whether ticketSubject can be manipuktaed to control the reply subject.  That would be very powerful.
  ticketSubject: string;
  threadId: string;
  /** URL Encoded Html String */
  content: string;
};
