import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { ZohoDeskContext } from '../ZohoDeskContext/ZohoDeskContext';
import ZOHODESK from '@/types/ZohoDesk/ZohoDesk';
import { Ticket } from '@/types/ZohoDesk';

import { Settings } from '../types/KeyzappHelper';

const KeyzappHelperLeftPanel = () => {
  const { app, loading } = useContext(ZohoDeskContext);
  const instance = app?.instance;

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return <div>Left Panel Widget</div>;
  }
};

export default KeyzappHelperLeftPanel;
