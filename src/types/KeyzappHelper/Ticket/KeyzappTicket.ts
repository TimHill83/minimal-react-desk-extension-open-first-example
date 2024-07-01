import { Ticket } from '../../ZohoDesk/Ticket';

export type KeyzappTicket = Ticket & {
  cf: {
    cf_number_of_fobs: string | null;
    cf_integrations: string | null;
    cf_associated_type: string;
    cf_order_location: string | null;
    cf_parent_ticket_id: string | null;
    cf_non_urgent_task_clare_to_handle: string;
    cf_test_flag: string;
    cf_admin_for_filing: string;
    cf_follow_up_date: string | null;
    cf_picklist_1: string | null;
    cf_updated_subject: string | null;
    cf_follow_up_in_days: string | null;
    cf_update_subect: string;
    cf_followup: string | null;
  };
};
