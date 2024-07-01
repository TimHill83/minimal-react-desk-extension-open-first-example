import { WidgetDetails } from '../types/ZohoDesk/WidgetDetails';
import ZOHODESK from '@/types/ZohoDesk/ZohoDesk';
import { ParentData } from '@/types/ZohoDesk';
import { Ticket } from '../types/ZohoDesk/Ticket';

export const isTicketDetailPage = async () => {
  // this logic is pretty horrible, but Zoho confirmed currently no way to check if we're on a ticket detail page

  try {
    await ZOHODESK.get('ticket');
    return true;
  } catch (err) {
    return false;
  }
};

type TicketResponse = {
  ticket: Ticket;
};

/**
 * Gets the current item
 */
export const getCurrentItem = async () => {
  //logic here is a bit brute force, since we can't ask ZohoDesk directly what item we're on.

  try {
    const ticket = await ZOHODESK.get('ticket');
    console.log('Desk Extension Example: We got a ticket', ticket);
    return ticket as TicketResponse;
    // try to return the ticket
  } catch (err) {
    return null;
  }
};

export const getWidgetDetailsByName = (
  widgets: WidgetDetails[],
  name: string
): WidgetDetails | undefined => {
  return widgets.find((widget) => widget.name === name);
};

/**
 * Wraps the Zoho Desk App.modal method to create a modal and pass it data.
 * Must be used in conjunction with the Modal component, which emits a 'modalReady' event when it is ready to receive data.
 * This function will wait for the modal to be ready before sending the data using a 'parentData' event.
 *
 * @template T The type of data to be passed to the modal
 * @param {any} App The Zoho Desk App instance
 * @param {string} url The URL for the HTML file of the modal to be launched
 * @param {string} title The title of the modal
 * @param {T} [theData] The data to be passed to the modal
 * @returns {Promise<void>} A promise that resolves when the modal is created and the data is sent
 */
export const createModal = async <T = any>(
  App: any,
  url: string,
  title: string,
  theData?: T
) => {
  console.log('Desk Extension Example: CreateModal Called', {
    App,
    url,
    title,
    theData
  });
  const modalInfo = await App.instance.modal({
    url,
    title
  });
  const modalInstance = App.instance.getWidgetInstance(modalInfo.widgetID);

  modalInstance.on('modalReady', function (stuff: any) {
    console.log('theData ', theData);

    const dataToSend: ParentData<T | undefined> = {
      parentWidget: modalInfo.widgetID,
      data: theData
    };

    console.log('Desk Extension Example: Emmitting parentData:', dataToSend);
    modalInstance.emit('parentData', dataToSend);
  });
};

/** Extracts emails from a string
 * @param input The string to extract emails from
 * @returns An array of emails
 */
export const extractEmails = (input: string | undefined): string[] => {
  console.log('Desk Extension Example: Extracting Emails from', input);
  const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const matches = input?.match(regex);
  return matches || [];
};
