import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import './i18n';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <GoogleOAuthProvider clientId="1029288761720-h7brlfcbioc4v8j3djd787pnvh0t818g.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </ThemeProvider>
)