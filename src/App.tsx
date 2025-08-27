import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Main } from './components/Main';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Main/>
    </MantineProvider>
  );
}
