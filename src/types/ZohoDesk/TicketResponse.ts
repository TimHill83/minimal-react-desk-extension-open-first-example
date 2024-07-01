import { Ticket } from './Ticket';

type TicketErrorResponse = {
  status: 'error';
};

type TicketSuccessResponse = {
  status: 'success';
  ticket: Ticket;
};

export type TicketResponse = TicketErrorResponse | TicketSuccessResponse;
