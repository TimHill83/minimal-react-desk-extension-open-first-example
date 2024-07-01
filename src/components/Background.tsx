import { useContext, useEffect, useState } from 'react';
import ZOHODESK from '@/types/ZohoDesk/ZohoDesk';
import { PageChangeData, ZohoDeskLocation } from '@/types/ZohoDesk';

import { isTicketDetailPage } from '@/utils';

import { ZohoDeskProvider } from '../ZohoDeskContext/ZohoDeskProvider';
import { ZohoDeskContext } from '../ZohoDeskContext/ZohoDeskContext';

export const BackgroundApp = () => {
  //Get Context
  const { app, loading } = useContext(ZohoDeskContext);

  // Navigation State
  const [currentView, setCurrentView] = useState<ZohoDeskLocation | null>(null);

  useEffect(() => {
    if (currentView?.module === 'ticket' && currentView?.page === 'detail') {
      ZOHODESK.invoke('ROUTE_TO', {
        entity: 'extension',
        location: 'desk.ticket.detail.lefttab',
        name: 'Keyzapp Helper'
      });
    }
  }, [currentView]);

  useEffect(() => {
    //Start up logic for the Extension
    const initializeApp = async () => {
      console.log(
        'Keyzapp Helper: Initializing Keyzapp Helper Background Checker'
      );

      try {
        //const App = await ZOHODESK.extension.onload();

        app.instance.on('pageChange', handlePageChange);

        if (!(await isTicketDetailPage())) {
          return;
        }
      } catch (err) {
        console.log('Keyzapp Helper: Error loading App');
      }
    };

    const handlePageChange = (pageChangeData: PageChangeData) => {
      console.log('Keyzapp Helper: pageChange', pageChangeData);
      setCurrentView(pageChangeData.currentView);
    };

    initializeApp();
    console.log('Keyzapp Helper: Background Checker initilaization complete');
  }, []);

  return null; // This component doesn't render anything
};

export const Background = () => {
  return (
    <ZohoDeskProvider>
      <BackgroundApp />
    </ZohoDeskProvider>
  );
};
