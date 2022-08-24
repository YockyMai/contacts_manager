import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
