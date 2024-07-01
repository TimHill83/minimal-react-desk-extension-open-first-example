import { useContext, useEffect, useRef, useState } from 'react';
import ZOHODESK from '@/types/ZohoDesk/ZohoDesk';
import { PageChangeData, ZohoDeskLocation } from '@/types/ZohoDesk';
import { Settings } from '@/types/KeyzappHelper';
import { getCurrentItem, isTicketDetailPage } from '@/utils';

import { fetchUserSettings, updateUserSettings } from '../utils/settings';
import { ZohoDeskProvider } from '../ZohoDeskContext/ZohoDeskProvider';
import { ZohoDeskContext } from '../ZohoDeskContext/ZohoDeskContext';

import { ZohoDeskItemData } from '@/types/KeyzappHelper';

export const BackgroundApp = () => {
  //Get Context
  const { app, loading } = useContext(ZohoDeskContext);

  // Navigation State
  const [currentView, setCurrentView] = useState<ZohoDeskLocation | null>(null);
  const [currentItemData, setCurrentItemData] =
    useState<ZohoDeskItemData | null>(null);

  // Settings State
  const [settings, setSettings] = useState<Settings | null>(null);
  // This ref is used to store the settings in a way that can be accessed by event listeners without causing a re-render
  // and without passing settings state directly
  const settingsRef = useRef<Settings | undefined>(undefined);

  // Update the settingsRef when the settings state changes
  useEffect(() => {
    if (settings) {
      console.log('Keyzapp Helper: Emit Settings', settings);
      app.instance.emit('settings', settings);

      settingsRef.current = settings;
    }
  }, [settings, app.instance]);

  useEffect(() => {
    if (currentView?.module === 'ticket' && currentView?.page === 'detail') {
      if (settings?.navigation?.showKeyzappHelperAsDefaultLeftPanel ?? true) {
        ZOHODESK.invoke('ROUTE_TO', {
          entity: 'extension',
          location: 'desk.ticket.detail.lefttab',
          name: 'Keyzapp Helper'
        });
      }
    }
  }, [currentView, settings]);

  useEffect(() => {
    //Start up logic for the Extension
    const initializeApp = async () => {
      console.log(
        'Keyzapp Helper: Initializing Keyzapp Helper Background Checker'
      );

      try {
        //const App = await ZOHODESK.extension.onload();

        app.instance.on('pageChange', handlePageChange);

        //Get Settings and store them in state, so they can be passed on to other components
        const fetchedSettings = await fetchUserSettings();
        console.log(
          'Keyzapp Helper: settings returned from DB',
          fetchedSettings
        );
        setSettings(fetchedSettings);

        //Send updated settings to handleTicketReply
        // app.instance.on('ticket.reply', async (data: any) => {
        //   return await handleTicketReply(data, settingsRef.current);
        // });

        //If another widget requests the settings, send them
        app.instance.on('getSettings', () => {
          app.instance.emit('settings', settingsRef.current);
        });

        app.instance.on('setSettings', async (data: Settings) => {
          // Should also update the settings in the server storage
          const updatedSettings = await updateUserSettings(data);
          console.log(
            'Keyzapp Helper: Settings returned from DB following update',
            updatedSettings
          );
          console.log('Keyzapp Helper: updatedSettings', updatedSettings);
          setSettings(updatedSettings);
          //app.instance.emit('settings', data);
        });

        //try to set up navigation based on the page we've landed on
        const currentItem = await getCurrentItem();

        if (currentItem?.ticket) {
          setCurrentItemData(currentItem);
          setCurrentView({ module: 'ticket', page: 'detail' });
        }

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
