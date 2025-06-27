import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from "./state/store"
import { Provider } from 'react-redux';
import UserLoader from './security/UserLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <UserLoader>
        <App />
      </UserLoader>
    </Provider>
  </StrictMode>
)
