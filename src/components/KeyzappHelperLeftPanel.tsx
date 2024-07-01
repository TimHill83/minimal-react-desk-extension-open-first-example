import { useContext } from 'react';
import { ZohoDeskContext } from '../ZohoDeskContext/ZohoDeskContext';

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
