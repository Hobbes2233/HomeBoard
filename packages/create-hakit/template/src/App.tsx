import { ThemeProvider } from '@hakit/components';
import Dashboard from './Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;