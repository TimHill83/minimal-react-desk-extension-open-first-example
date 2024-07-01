export type ZohoDeskPage =
  | 'addForm'
  | 'detail'
  | 'editForm'
  | 'list'
  | 'dashboard'
  | 'postDetail'
  | 'forum'
  | 'manage';

export type ZohoDeskModule =
  | 'ticket'
  | 'contact'
  | 'kb'
  | 'dashboard'
  | 'social'
  | 'chat'
  | 'extension'
  | 'setup'
  | 'community'
  | 'report'
  | 'task'
  | 'activity'
  | 'call'
  | 'event'
  | 'teamFeed'
  | 'kb'
  | 'account';

export type ZohoDeskLocation = {
  module: ZohoDeskModule;
  page: ZohoDeskPage;
};

export type PageChangeData = {
  previousView: ZohoDeskLocation;
  currentView: ZohoDeskLocation;
};
