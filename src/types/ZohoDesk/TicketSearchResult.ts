import { z } from 'zod';

const SharedDepartmentSchema = z.object({
  name: z.string(),
  id: z.string(),
  type: z.string(),
});

const AccountSchema = z.object({
  website: z.string(),
  accountName: z.string(),
  id: z.string(),
});

const ContactSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  phone: z.string(),
  mobile: z.string(),
  id: z.string(),
  type: z.null().optional(),
  email: z.string(),
  account: AccountSchema,
});

const DepartmentSchema = z.object({
  name: z.string(),
  id: z.string(),
});

const CfSchema = z.object({
  cf_permanentaddress: z.null().optional(),
  cf_dateofpurchase: z.null().optional(),
  cf_phone: z.null().optional(),
  cf_numberofitems: z.null().optional(),
  cf_url: z.null().optional(),
  cf_secondaryemail: z.null().optional(),
  cf_severitypercentage: z.string(),
  cf_modelname: z.string(),
});

const LastThreadSchema = z.object({
  channel: z.string(),
  isDraft: z.boolean(),
  isForward: z.boolean(),
  direction: z.string(),
});

const TeamSchema = z.object({
  name: z.string(),
  id: z.string(),
  logoUrl: z.string(),
});

const AssigneeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  photoURL: z.string(),
  emailId: z.string(),
  id: z.string(),
  zuid: z.string(),
});

export const TicketSearchResultSchema = z.object({
  modifiedTime: z.string(),
  ticketNumber: z.string(),
  subCategory: z.string(),
  statusType: z.string(),
  subject: z.string(),
  dueDate: z.string(),
  departmentId: z.string(),
  isRead: z.boolean(),
  channel: z.string(),
  onholdTime: z.null().optional(),
  description: z.string(),
  resolution: z.null().optional(),
  sharedDepartments: z.array(SharedDepartmentSchema),
  closedTime: z.null().optional(),
  isOverDue: z.boolean(),
  contact: ContactSchema,
  createdTime: z.string(),
  modifiedBy: z.string(),
  id: z.string(),
  department: DepartmentSchema,
  email: z.string(),
  customerResponseTime: z.string(),
  product: z.null().optional(),
  cf: CfSchema,
  productId: z.null().optional(),
  contactId: z.string(),
  threadCount: z.string(),
  lastThread: LastThreadSchema,
  team: TeamSchema,
  priority: z.string(),
  classification: z.null().optional(),
  assigneeId: z.string(),
  commentCount: z.string(),
  phone: z.string(),
  createdBy: z.string(),
  webUrl: z.string(),
  teamId: z.string(),
  isEscalated: z.boolean(),
  isSpam: z.boolean(),
  assignee: AssigneeSchema,
  category: z.string(),
  status: z.string(),
});

export type TicketSearchResult = z.infer<typeof TicketSearchResultSchema>;