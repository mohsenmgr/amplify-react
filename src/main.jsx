import { ThemeProvider } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import config from './aws-exports'
import './index.css'

Amplify.configure(config)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
