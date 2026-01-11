import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from './components/Header';
import { TranslateDemo } from './pages/TranslateDemo';
import { WorkflowExplanation } from './pages/WorkflowExplanation';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'grey.50' }}>
          <Routes>
            <Route path="/" element={<TranslateDemo />} />
            <Route path="/workflow" element={<WorkflowExplanation />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
