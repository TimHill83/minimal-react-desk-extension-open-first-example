type ValidationSuccessResult = {
  passesValidation: true;
};

type ValidationFailureResult = {
  passesValidation: false;
  title?: string;
  message?: string;
  data?: any;
};

export type ValidationResult =
  | ValidationSuccessResult
  | ValidationFailureResult;

export type TicketReplyEmails = {
  to: string[];
  cc: string[];
};
