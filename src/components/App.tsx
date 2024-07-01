import { ZohoDeskProvider } from '../ZohoDeskContext/ZohoDeskProvider';
import KeyzappHelperLeftPanel from './KeyzappHelperLeftPanel';

const App = () => {
  return (
    <ZohoDeskProvider>
      <KeyzappHelperLeftPanel />
    </ZohoDeskProvider>
  );
};
export default App;
