import { useContext } from 'react';
import { ZohoDeskContext } from '../ZohoDeskContext/ZohoDeskContext';

const LeftPanel = () => {
  const { app, loading } = useContext(ZohoDeskContext);
  const instance = app?.instance;

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return <div>Left Panel Widget</div>;
  }
};

export default LeftPanel;
