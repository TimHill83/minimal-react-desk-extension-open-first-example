import { ZohoDeskProvider } from '../../ZohoDeskContext/ZohoDeskProvider';
import { RenderObject } from '../RenderObject';
import { ZohoDeskContext } from '../../ZohoDeskContext/ZohoDeskContext';
import { useContext, useEffect, useState } from 'react';
import ZOHODESK from '../../types/ZohoDesk/ZohoDesk';
import { Ticket } from '../../types/ZohoDesk/Ticket';
import { ParentData } from '../../types/ZohoDesk/parentData';

type ModalProps<T> = {
  children: (parentData: ParentData<T> | null) => React.ReactNode;
};

/**
 *  Renders a modal component that wraps the provided content and allows for handling of data
 *  from the widget that opened the modal.
 */
const ModalContent = <T,>({ children }: ModalProps<T>) => {
  const { app } = useContext(ZohoDeskContext);
  const [parentData, setParentData] = useState<ParentData<T> | null>(null);

  useEffect(() => {
    console.log('Keyzapp Helper: Modal: useEffect');
    if (!app) {
      console.log('Keyzapp Helper: Modal: app is null');
      return;
    }
    //Set modal to largest size
    ZOHODESK.invoke('RESIZE', { width: '100%', height: '100%' });

    //Set up a listener for the ticket data, that will update the state
    app.instance.on('parentData', function (data: ParentData<T>) {
      console.log('Keyzapp Helper: Parent Data Received:', data);
      setParentData(data);
    });

    console.log('Keyzapp Helper: Modal: emit modalReady');
    app.instance.emit('modalReady');
  }, [app]);

  if (!app) return null;
  return children(parentData);
};

/**
 * Renders a modal component that wraps the provided content, giving access to data from the widget that opened the modal.
 * Used in conjunction with createModal<T> on the parent widget.
 * @template T - The type of data expected by the modal.
 * @param {ModalProps<T>} props - The props for the Modal component.
 * @returns {React.ReactNode} The rendered modal component.
 * @example
 * // Render a modal component for 'Ticket' data type
 * <Modal<Ticket>>
 *   {(parentData) => (
 *     // Render the content of the modal
 *     <div>
 *       <h1>Ticket Modal</h1>
 *       {parentData && (
 *         <p>Ticket ID: {parentData.data.ticketId}</p>
 *       )}
 *     </div>
 *   )}
 * </Modal<Ticket>>
 */
export const Modal = <T,>({ children }: ModalProps<T>) => {
  return (
    <ZohoDeskProvider>
      <ModalContent>{children}</ModalContent>
    </ZohoDeskProvider>
  );
};

const ShowTicketInfo = () => {
  const { app } = useContext(ZohoDeskContext);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    //Set modal to largest size
    ZOHODESK.invoke('RESIZE', { width: '100%', height: '100%' });

    //Set up a listener for the ticket data, that will update the state
    app.instance.on('ticketData', function (data: Ticket) {
      console.log('Keyzapp Helper: ticketData', data);
      setTicket(data);
    });

    app.instance.emit('Ready');

    // communicateWithBackground();
  }, [app]);

  if (!app) {
    return (
      <div>
        Error: This component must be within a ZohoDeskProvider context
        provider.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-blue-600">Ticket Reply Details</h2>
      <div className="w-full h-64 overflow-scroll border border-gray-500">
        {ticket && <RenderObject objectToRender={ticket} />}
      </div>
    </div>
  );
};
