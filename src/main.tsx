import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './globals.css'
import App from './App.tsx'
import {Provider} from 'react-redux';
import MainLayout from "./components/Layout/MainLayout.tsx"
import {store} from './store/store'


createRoot(document.getElementById('root')!).render(
  <StrictMode><MainLayout><Provider store={store}><App /></Provider></MainLayout></StrictMode>
)