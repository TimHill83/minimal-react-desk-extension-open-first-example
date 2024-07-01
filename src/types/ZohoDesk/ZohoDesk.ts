import { TicketResponse } from './TicketResponse';

type ZohoDesk = {
  get(recordType: 'ticket'): Promise<TicketResponse>;
  get(
    recordType: 'database',
    options: { key?: string; queriableValue: string }
  ): Promise<any>;
  get(recordType: string): Promise<any>;
  extension: any;
  set(key: 'database', value: any): Promise<DatabaseSetResponse>;
  set(key: string, value: any): Promise<{ status: string }>;
  showpopup(options: ShowPopupOptions): Promise<void>;
  request: (requestObj: RequestObject) => Promise<any>; // Come back and type properly!
  invoke: {
    (action: 'INSERT', target: string, options: InsertOptions): void;
    (action: 'ROUTE_TO', options: RouteToOptions): void;
    (action: 'RESIZE', options?: { width: string; height: string }): void;
    (action: 'MODAL_CLOSE'): void;
  };
};

declare const ZOHODESK: ZohoDesk;

export default ZOHODESK;

export type RequestObject = {
  url: string;
  /** If the request involves a patch method, the value of type must be POST and the value of headers must be { header-override : PATCH }. */
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: object;
  /**  Represents entity body. This parameter, which must be passed as an object, is required for PATCH, POST, and PUT requests.If you are making a GET call, make the postBody as empty.*/
  postBody: object | {} extends { [key: string]: any } ? {} : object;
  /** Key that contains the data to be appended as queryParams to the URL. */
  data?: object;
  /** Key for authenticating the third-party domain. The value of this parameter must be the same as the one passed in the connectionLinkName value in the plugin manifest. */
  connectionLinkName?: string;
  /** Key that specifies the type of data the response must contain. Values allowed are: arraybuffer, blob, document, json, text, ms-stream, and empty string. If responseType is mentioned in the payload, the postBody and fileObj will not be considered. */
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'ms-stream'
    | '';
  /** Key that helps upload file objects to the third-party domain. The value of this key must be an array of objects containing the key and file parameters.*/
  fileObj?: object;
};

type InsertOptions = {
  value: string;
  type?: string;
};

type DatabaseSetResponse = {
  'database.set': {
    queriableValue?: string;
    value: any;
    key: string;
  };
};

export type RouteToOptions =
  | {
      entity: 'ticket' | 'contact' | 'account' | 'call' | 'task' | 'event';
      id: string;
      page?: 'add' | 'edit' | 'dv';
    }
  | {
      entity: 'extension';
      location:
        | 'desk.ticket.detail.rightpanel'
        | 'desk.topband'
        | 'desk.ticket.detail.subtab'
        | 'desk.ticket.detail.lefttab'
        | 'desk.bottomband'
        | 'desk.extension.telephony';
      name: string;
    };

type PopupType = 'alert' | 'confirmation';

type ShowPopupOptions = {
  title: string;
  content?: string;
  type: PopupType;
  contentType: 'html';
  color?: 'red' | 'blue';
  okText?: string;
  cancelText?: string;
};
