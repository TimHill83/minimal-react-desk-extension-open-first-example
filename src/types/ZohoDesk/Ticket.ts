/**Ticket as returned by requesting ticket details */
export type Ticket = {
  departmentId: string;
  email: string;
  subject: string;
  description: string | null;
  status: string;
  dueDate: string;
  threadCount: string;
  isSpam: string;
  createdTime: string;
  modifiedTime: string;
  assignee: {
    id: string;
    name: string;
  };
  owner: string;
  id: string;
  accountName: string;
  phone: string;
  productName: string | null;
  commentCount: string;
  priority: string | null;
  channel: string;
  classification: string;
  category: string | null;
  subCategory: string | null;
  contactName: string;
  number: string;
  contactId: string;
  link: string;
  currentTimeEntry: string;
  cf: Record<string, string | null>;
};
