import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/inter/wght.css';
import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
