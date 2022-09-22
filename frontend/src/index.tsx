import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import { mainColorTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: mainColorTheme,
        variant: "outline",
      },
      baseStyle: {
        borderRadius: "none",
      }
    }
  }
})

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
