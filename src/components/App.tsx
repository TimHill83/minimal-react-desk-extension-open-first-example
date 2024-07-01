import { ZohoDeskProvider } from '../ZohoDeskContext/ZohoDeskProvider';
import LeftPanel from './LeftPanel';

const App = () => {
  return (
    <ZohoDeskProvider>
      <LeftPanel />
    </ZohoDeskProvider>
  );
};
export default App;
